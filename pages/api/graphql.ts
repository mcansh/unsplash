import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { RedisCache } from 'apollo-server-cache-redis';

import { PhotoAPI } from '~/graphql/server/data-sources/photo';
import { UserAPI } from '~/graphql/server/data-sources/user';
import { schema } from '~/graphql/server/schema';

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({ photo: new PhotoAPI(), user: new UserAPI() }),
  context: ({ req, res }: Context) => ({ req, res }),
  cache:
    process.env.NODE_ENV === 'production'
      ? new RedisCache(process.env.UNSPLASH_REDIS)
      : undefined,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
