import 'graphql-import-node';
import * as typeDefs from './rootSchema.graphql';
import {makeExecutableSchema} from 'graphql-tools';
import Resolver from "./resolverMap";
import {createSqliteConnection} from "../../configuration/database/createConntection";
import {createServerDependenciesContainer} from "../../configuration/serverDependencyContainer";

// @ts-ignore
const sqliteConnexion = await createSqliteConnection()
export const serverDependencyContainer = createServerDependenciesContainer(sqliteConnexion)

export const resolvers = new Resolver(serverDependencyContainer).getResolvers()
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
