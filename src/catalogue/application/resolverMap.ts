import {IResolvers} from "@graphql-tools/utils";
import {CatalogueDependencyContainer} from "../configuration/catalogue.dependencyContainer";
import {CommandeOutputApi} from "./commande/CommandeOutputApi";
import {ErreurOutputApi} from "./shared/ErreurOuputApi";
import {toCommandeOutputApi} from "./shared/mappingUtils";
import {ListeCommandeOutputApi} from "./commande/ListeCommandeOutputApi";
import {AucunProduitTrouve} from "../domain/errors/AucunProduitTrouve";
import {ProduitOutputApi} from "./produit/ProduitOutputApi";

//Todo: transformer cela en function
export class Resolver {

  constructor(private catalogueDependencyContainer: CatalogueDependencyContainer) {
  }

  getResolvers(): IResolvers {
    const _this = this;
    return {
      Query: {
        recupererLesProduits(_, {filter}, __, ___) {
            try {
                const produits = _this.catalogueDependencyContainer.recupererLesProduits.exécuter(filter)
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
        recupererLeProduit(_, {id}, __, ___) {
                    const produit = _this.catalogueDependencyContainer.recupererLeProduit.exécuter(id)
                    if(produit){
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
                recupererLesCommandes(_: void, {...args}) : ListeCommandeOutputApi | ErreurOutputApi {
                    try {
                        return {
                            commandes: _this.catalogueDependencyContainer.recupererLesCommandes.exécuter()
                                .map(toCommandeOutputApi)
                        }
                    } catch (e) {
                        return {
                            __typename: 'CommandeNonTrouvee',
                            message: e.message
                        }
                    }
                },
                recupererLaCommande(_: void, {id, ...args}): CommandeOutputApi | ErreurOutputApi {
				    try {
                        return toCommandeOutputApi(_this.catalogueDependencyContainer.recupererLaCommande.exécuter(id))
                    } catch (e) {
                        return {
                            __typename: 'CommandeNonTrouvee',
                            message: e.message
                        }
                    }
                }
			},
			Mutation: {
				sauvegarderProduit(_, {produit}, __, ___): ProduitOutputApi {
          return _this.catalogueDependencyContainer.creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
				},
                sauvegarderCommande(_: void, {commande, ...args}): CommandeOutputApi {
				    return toCommandeOutputApi(_this.catalogueDependencyContainer.creerUneCommande.exécuter(commande.elements))
                }
			},
            ResultatListeCommande: {
                __resolveType: (obj) => {
                    if ('commandes' in obj) return 'ListeCommande'
                    else return 'CommandeNonTrouvee'
                },
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
