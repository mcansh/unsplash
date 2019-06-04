import { ApolloServer } from 'apollo-server-micro';
import microCors from 'micro-cors';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const cors = microCors();

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('now-env');
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

module.exports = cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
  }
  return server.createHandler()(req, res);
});
