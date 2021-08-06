import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from '../src/schema/schema';

const app = express();
app.use('*', cors());
app.use(compression());
const httpServer = createServer(app);

const server = new ApolloServer({
    schema,
});
server.start().then(r => server.applyMiddleware({ app, path: '/graphql' }));

httpServer.listen(
    { port: 3000 },
    (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
