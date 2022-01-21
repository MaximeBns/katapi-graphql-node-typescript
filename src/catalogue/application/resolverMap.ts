import {IResolvers} from "@graphql-tools/utils";
import {CatalogueDependencyContainer} from "../configuration/catalogue.dependencyContainer";
import {CommandeOutputApi} from "./commande/CommandeOutputApi";
import {ErreurOutputApi} from "./shared/ErreurOuputApi";
import {toCommandeOutputApi} from "./shared/mappingUtils";
import {ListeCommandeOutputApi} from "./commande/ListeCommandeOutputApi";
import {AucunProduitTrouve} from "../domain/errors/AucunProduitTrouve";
import {ProduitOutputApi} from "./produit/ProduitOutputApi";
import Commande from "../domain/entities/commande/commande";

//Todo: transformer cela en function
export class Resolver {
    constructor(private catalogueDependencyContainer: CatalogueDependencyContainer) {
    }

    getResolvers(): IResolvers {
        const _this = this;
        return {
            Query: {
                async recupererLesProduits(_, {filter}, __, ___) {
                    try {
                        const produits = await _this.catalogueDependencyContainer.recupererLesProduits.exécuter(filter)
                        return {
                            __typename: "ListeDeProduits",
                            produits: produits
                        }
                    } catch (e) {
                        if (e instanceof AucunProduitTrouve) {
                            return {
                                __typename: 'NotFoundError',
                                code: e.code,
                                message: e.message
                            }
                        }
                        return {
                            __typename: 'InternalServerError',
                            code: 500,
                            message: `une erreur inconnue c'est produite`
                        }
                    }
                }
                ,
                async recupererLeProduit(_, {id}, __, ___) {
                    const produit = await _this.catalogueDependencyContainer.recupererLeProduit.exécuter(id)
                    if (produit) {
                        return {
                            __typename: "Produit",
                            ...produit
                        }
                    }
                    return {
                        __typename: 'ProduitNonTrouve',
                        message: `Le produit avec l'id ${id} n'existe pas`
                    }
                },
                async recupererLesCommandes(_: void, {...args}): Promise<ListeCommandeOutputApi | ErreurOutputApi> {
                    try {
                        const commandes = await _this.catalogueDependencyContainer.recupererLesCommandes.exécuter()
                        return {
                            commandes: commandes.map(toCommandeOutputApi)
                        }
                    } catch (e) {
                        return {
                            __typename: 'CommandeNonTrouvee',
                            message: e.message
                        }
                    }
                },
                async recupererLaCommande(_: void, {id, ...args}): Promise<CommandeOutputApi | ErreurOutputApi> {
                    try {
                        const commande = await _this.catalogueDependencyContainer.recupererLaCommande.exécuter(id)
                        return toCommandeOutputApi(commande)
                    } catch (e) {
                        return {
                            __typename: 'CommandeNonTrouvee',
                            id: id,
                            message: e.message
                        }
                    }
                }
            },
            Mutation: {
                async sauvegarderProduit(_, {produit}, __, ___): Promise<ProduitOutputApi> {
                    return await _this.catalogueDependencyContainer.creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
                },
                async sauvegarderCommande(_: void, {commande, ...args}): Promise<CommandeOutputApi> {
                    return toCommandeOutputApi(await _this.catalogueDependencyContainer.creerUneCommande.exécuter(commande.elements))
                }
            },
            ResultatListeCommande: {
                __resolveType: (obj) => {
                    if ('commandes' in obj) return 'ListeCommande'
                    else return 'CommandeNonTrouvee'
                },
            },
            Commande: {
                elements : async (commande: CommandeOutputApi, __, ___) => {
                    console.log("toto", commande, __, ___)
                    const elementsRécupérés = await _this.catalogueDependencyContainer.recupererLesElementsDUneCommande.exécuter(commande.id);
                    if (!elementsRécupérés.length) return [];
                    return toCommandeOutputApi(elementsRécupérés);
                }
            },
            ResultatProduit: {
                __resolveType: (obj) => {
                    if ('nom' in obj) return 'Produit'
                    else return 'ProduitNonTrouve'
                },
            }
        };
    }
}

export default Resolver;
