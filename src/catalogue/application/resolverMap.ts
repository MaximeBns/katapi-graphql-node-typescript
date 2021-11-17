import {IResolvers} from "@graphql-tools/utils";
import ProduitOutputApi from "./produit/ProduitOutputApi";
import { CatalogueDependencyContainer } from "../configuration/catalogue.dependencyContainer";

class Resolver {
	constructor(private catalogueDependencyContainer: CatalogueDependencyContainer) {
	}

	getResolvers(): IResolvers {
		const _this = this;
		return {
			Query: {
				recupererLesProduits(_: void, {filter, ...args}): ProduitOutputApi[] {
					return _this.catalogueDependencyContainer.recupererLesProduits.exécuter(filter)
				},
				recupererLeProduit(_: void, {id, ...args}): ProduitOutputApi {
					return _this.catalogueDependencyContainer.recupererLeProduit.exécuter(id)
				}
			},
			Mutation: {
				sauvegarderProduit(_: void, {produit, ...args}): ProduitOutputApi {
					return _this.catalogueDependencyContainer.creerUnProduit.exécuter(produit.nom, produit.prix, produit.poids)
				}
			}
		};
	}
}

export default Resolver;
