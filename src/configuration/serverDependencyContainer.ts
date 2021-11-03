import CreateCatalogueDependencyContainer, {CatalogueDependencyContainer} from "../catalogue/configuration/catalogue.dependencyContainer";

export type ServerDependencyContainer = {
	catalogueDependencyContainer: CatalogueDependencyContainer
}

export function createServerDependenciesContainer(): ServerDependencyContainer {
	const catalogueDependencyContainer = CreateCatalogueDependencyContainer()
	return {
		catalogueDependencyContainer: catalogueDependencyContainer,
	}
}


