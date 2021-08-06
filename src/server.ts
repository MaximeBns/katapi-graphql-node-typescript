import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from '../src/schema/schema';

const app = express();
const server = new ApolloServer({
    //@ts-ignore
    schema,
});

// @ts-ignore
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
    { port: 3000 },
    (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
