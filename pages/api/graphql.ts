import { ApolloServer } from 'apollo-server-micro';

import { PhotoAPI } from '~/graphql/data-sources/photo';
import { PhotoResolvers } from '~/graphql/resolvers/photo';
import { PhotoTypeDefs } from '~/graphql/type-defs/photo';
import { UserTypeDefs } from '~/graphql/type-defs/user';
import cookies from '~/utils/cookies';

const apolloServer = new ApolloServer({
  typeDefs: [UserTypeDefs, PhotoTypeDefs],
  resolvers: [PhotoResolvers],
  dataSources: () => ({ photo: new PhotoAPI() }),
  context: ({ req, res }) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cookies(apolloServer.createHandler({ path: '/api/graphql' }));
