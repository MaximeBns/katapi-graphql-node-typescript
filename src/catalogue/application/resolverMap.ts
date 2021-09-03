import { IResolvers } from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
import RecupererLesProduits from "../usecases/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import { Container, Service } from "typedi";

@Service()
class Resolver {
    constructor(private récupérerLesProduits: RecupererLesProduits, private creerUnProduit: CreerUnProduit) {}

    getResolvers() : IResolvers {
        const _this = this;

        return {
            Query: {
                recupererLesProduits(_: void) : ProduitOutputApi[]{
                    return _this.récupérerLesProduits.exécuter()
                },
            },
            Mutation: {
                sauvegarderProduit(_: void,  {produit, ...args}): ProduitOutputApi {
                    return _this.creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
                }
            }
        };
    }
}

export default Resolver;