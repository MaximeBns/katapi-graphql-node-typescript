import {IResolvers} from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
import { CatalogueDependencyContainer } from "../configuration/catalogue.dependencyContainer";
import {ServerDependencyContainer} from "../../configuration/serverDependencyContainer";

class Resolver {
	constructor(private serverDependenciesContainer: ServerDependencyContainer) {
	}

	getResolvers(): IResolvers {
		const _this = this;
		return {
			Query: {
				recupererLesProduits(_: void, {filter, ...args}): ProduitOutputApi[] {
					return _this.serverDependenciesContainer.catalogueDependencyContainer.recupererLesProduits.exécuter(filter)
				},
				recupererLeProduit(_: void, {id, ...args}) {
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
				sauvegarderProduit(_: void, {produit, ...args}): ProduitOutputApi {
					return _this.serverDependenciesContainer.catalogueDependencyContainer.creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
				}
			}
		};
	}
}

export default Resolver;
