import {IResolvers} from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
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
				recupererLeProduit(_: void, {id, ...args}): ProduitOutputApi {
					return _this.serverDependenciesContainer.catalogueDependencyContainer.recupererLeProduit.exécuter(id)
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
