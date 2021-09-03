import 'graphql-import-node';
import * as typeDefs from './rootSchema.graphql';
import {makeExecutableSchema} from 'graphql-tools';
import { Container } from "typedi";
import Resolver from "./resolverMap";

export const resolvers = Container.get(Resolver).getResolvers();
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
