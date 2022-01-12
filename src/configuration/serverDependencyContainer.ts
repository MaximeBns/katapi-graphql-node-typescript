import createCatalogueDependencyContainer, {CatalogueDependenciesContainer} from "../catalogue/configuration/catalogueDependenciesContainer";

export type ServerDependencyContainer = {
	catalogueDependencyContainer: CatalogueDependenciesContainer
}

export function createServerDependenciesContainer(): ServerDependencyContainer {
	const catalogueDependencyContainer = createCatalogueDependencyContainer()
	return {
		catalogueDependencyContainer: catalogueDependencyContainer,
	}
}


