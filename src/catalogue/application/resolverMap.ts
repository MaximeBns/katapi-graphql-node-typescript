import { IResolvers } from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
import RecupererLesProduits from "../usecases/recupererLesProduits";
import ProduitPort from "../domain/ports/produitPort";
import ProduitAdapter from "../infrastructure/adapter/ProduitAdapter";
import CreerUnProduit from "../usecases/creerUnProduit";

const produitPort : ProduitPort = new ProduitAdapter()
const recupererProduit = new RecupererLesProduits(produitPort)
const creerUnProduit = new CreerUnProduit(produitPort)

const resolverMap: IResolvers = {
    Query: {
        recupererLesProduits(_: void) : ProduitOutputApi[]{
            return recupererProduit.exécuter()
        },
    },
    Mutation: {
        sauvegarderProduit(_: void,  {produit, ...args}): ProduitOutputApi {
            return creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
        }
    }
};

export default resolverMap;
