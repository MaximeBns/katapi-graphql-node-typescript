import 'graphql-import-node';
import * as typeDefs from './rootSchema.graphql';
import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolverMap';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
