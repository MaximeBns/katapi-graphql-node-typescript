import {IResolvers} from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
import { CatalogueDependencyContainer } from "../configuration/catalogue.dependencyContainer";
import {ServerDependencyContainer} from "../../configuration/serverDependencyContainer";

//Todo: transformer cela en function
export class Resolver {

  constructor(private serverDependenciesContainer: ServerDependencyContainer) {
  }

  getResolvers(): IResolvers {
    const _this = this;
    return {
      Query: {
        recupererLesProduits(parent, {filter}, context, info) {
          const listeProduit = _this.serverDependenciesContainer.catalogueDependencyContainer.recupererLesProduits.exécuter(filter)
          if(listeProduit.length){
            return {
              __typename: "ListeProduit",
              produits : listeProduit
            }
          }
          return {
            __typename: 'ProduitNonTrouve',
            message: `Aucun Produit n'a été trouvé`
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
