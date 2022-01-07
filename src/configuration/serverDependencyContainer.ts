import createCatalogueDependencyContainer, {CatalogueDependencyContainer} from "../catalogue/configuration/catalogue.dependencyContainer";

export type ServerDependencyContainer = {
	catalogueDependencyContainer: CatalogueDependencyContainer
}

export function createServerDependenciesContainer(): ServerDependencyContainer {
	const catalogueDependencyContainer = createCatalogueDependencyContainer()
	return {
		catalogueDependencyContainer: catalogueDependencyContainer,
	}
}


