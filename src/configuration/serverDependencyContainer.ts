import CreateCatalogueDependencyContainer, {CatalogueDependencyContainer} from "../catalogue/configuration/catalogue.dependencyContainer";
import {Connection} from "typeorm";

export type ServerDependencyContainer = {
	catalogueDependencyContainer: CatalogueDependencyContainer
}

export function createServerDependenciesContainer(conntection: Connection): ServerDependencyContainer {
	const catalogueDependencyContainer = CreateCatalogueDependencyContainer(conntection)
	return {
		catalogueDependencyContainer: catalogueDependencyContainer,
	}
}


