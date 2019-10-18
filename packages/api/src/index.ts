import { ApolloServer } from 'apollo-server-micro';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  playground: true,
});

const app = server.createHandler();

export default app;
