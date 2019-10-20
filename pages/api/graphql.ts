import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
// import { RedisCache } from 'apollo-server-cache-redis';

import { PhotoAPI } from '~/graphql/data-sources/photo';
import { PhotoResolvers } from '~/graphql/resolvers/photo';
import { PhotoTypeDefs } from '~/graphql/type-defs/photo';
import { UserTypeDefs } from '~/graphql/type-defs/user';
import { UserAPI } from '~/graphql/data-sources/user';
import { UserResolvers } from '~/graphql/resolvers/user';

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

const apolloServer = new ApolloServer({
  typeDefs: [UserTypeDefs, PhotoTypeDefs],
  resolvers: [UserResolvers, PhotoResolvers],
  dataSources: () => ({ photo: new PhotoAPI(), user: new UserAPI() }),
  context: ({ req, res }: Context) => ({ req, res }),
  // cache: new RedisCache(process.env.REDIS),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
