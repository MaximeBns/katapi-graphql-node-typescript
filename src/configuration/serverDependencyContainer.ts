import CreateCatalogueDependencyContainer, {CatalogueDependencyContainer} from "../catalogue/configuration/catalogue.dependencyContainer";
import { Connection } from "typeorm";

export type ServerDependencyContainer = {
	catalogueDependencyContainer: CatalogueDependencyContainer
}

export function createServerDependenciesContainer(connection: Connection): ServerDependencyContainer {
	const catalogueDependencyContainer = CreateCatalogueDependencyContainer(connection)
	return {
		catalogueDependencyContainer: catalogueDependencyContainer,
	}
}


