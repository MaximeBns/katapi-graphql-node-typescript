import {IResolvers} from "@graphql-tools/utils";
import {ServerDependencyContainer} from "../../configuration/serverDependencyContainer";
import {ProduitOutputApi} from "./produit/ProduitOutputApi";
import {AucunProduitTrouve} from "../domain/errors/AucunProduitTrouve";

//Todo: transformer cela en function
export class Resolver {

  constructor(private serverDependenciesContainer: ServerDependencyContainer) {
  }

  getResolvers(): IResolvers {
    const _this = this;
    return {
      Query: {
        recupererLesProduits(_, {filter}, __, ___) {
          try {
            const produits  = _this.serverDependenciesContainer.catalogueDependencyContainer.recupererLesProduits.exécuter(filter)
            return {
              __typename: "ListeDeProduits",
              produits: produits
            }
          }catch (e){
            if (e instanceof AucunProduitTrouve){
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
        },
        recupererLeProduit(_, {id}, __, ___) {
          const produit = _this.serverDependenciesContainer.catalogueDependencyContainer.recupererLeProduit.exécuter(id)
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
        }
      },
      Mutation: {
        sauvegarderProduit(_, {produit}, __, ___): ProduitOutputApi {
          return _this.serverDependenciesContainer.catalogueDependencyContainer.creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
        }
      }
    };
  }
}

export default Resolver;
