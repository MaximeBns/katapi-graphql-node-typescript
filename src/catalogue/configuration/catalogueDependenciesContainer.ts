import TypeORMClient from "../../configuration/database/TypeORMClient";
import {createPostgresConnection} from "../../configuration/database/createPostgresConnection";
import createReadCatalogueDependenciesContainer, {ReadCatalogueDependenciesContainer} from "../read/configuration/readCatalogueDepenciesContainer";
import createWriteCatalogueDependenciesContainer, {WriteCatalogueDependenciesContainer} from "../write/configuration/writeCatalogueDependenciesContainer";


export type CatalogueDependenciesContainer = ReadCatalogueDependenciesContainer & WriteCatalogueDependenciesContainer;

export default function createCatalogueDependencyContainer(): CatalogueDependenciesContainer {
  const typeORMClient = new TypeORMClient(createPostgresConnection())
  return {
    ...createReadCatalogueDependenciesContainer(typeORMClient),
    ...createWriteCatalogueDependenciesContainer(typeORMClient)
  }
}
