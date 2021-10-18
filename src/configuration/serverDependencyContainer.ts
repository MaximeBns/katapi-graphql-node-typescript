import createCatalogueDependencyContainer, {CatalogueDependencyContainer} from "../catalogue/configuration/catalogue.dependencyContainer";
import ProduitAdapter from "../catalogue/infrastructure/adapter/ProduitAdapter";

export type ServerDependencyContainer = {
	catalogueDependencyContainer: CatalogueDependencyContainer
}

export function createServerDependenciesContainer(): ServerDependencyContainer {
	const produitAdapter = new ProduitAdapter()
	const catalogueDependencyContainer = createCatalogueDependencyContainer(produitAdapter)
	return {
		catalogueDependencyContainer: catalogueDependencyContainer,
	}
}


