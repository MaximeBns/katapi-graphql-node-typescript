import { IResolvers } from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
import RecupererLesProduits from "../usecases/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import { Container, Service } from "typedi";
import RecupererLeProduit from "../usecases/recupererLeProduit";
import {filter} from "compression";

@Service()
class Resolver {
    constructor(private récupérerLesProduits: RecupererLesProduits, private récupérerLeProduit: RecupererLeProduit, private creerUnProduit: CreerUnProduit) {}

    getResolvers() : IResolvers {
        const _this = this;

        return {
            Query: {
                recupererLesProduits(_: void, {...args}) : ProduitOutputApi[]{
                    return _this.récupérerLesProduits.exécuter()
                },
                recupererLeProduit(_:void,{id, ...args}): ProduitOutputApi {
                  return _this.récupérerLeProduit.exécuter(id)
                }
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
