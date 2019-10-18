import { IncomingMessage } from 'http';
import {
  getPhotos,
  me,
  likePhoto,
  getPhotoById,
  downloadPhoto,
} from '../fetches';

type Resolver = (
  parent: any,
  args: any,
  context: { req: IncomingMessage },
  info: any
) => any;

interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

const resolvers: ResolverMap = {
  Mutation: {
    likePhoto: async (_parent, { id }, { req }) => {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error('Authorization required');
      }

      try {
        return likePhoto({ id, accessToken: authorization });
      } catch (error) {
        return error;
      }
    },
    downloadPhoto: async (_, { id }: { id: string }) => {
      try {
        return downloadPhoto({ id });
      } catch (error) {
        return error;
      }
    },
  },
  Query: {
    photos: async (_, args) => {
      const promise = await getPhotos(args);
      return promise.json();
    },
    randomPhoto: async (_, args) => {
      const promise = await getPhotos({ ...args, random: true });
      return promise.json();
    },
    getPhotoById: async (_parent, args) => {
      const promise = await getPhotoById(args);
      return promise.json();
    },
    me: async (_parent, args, { req }) => {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new Error('Not Authenticated');
      }

      try {
        const promise = await me({
          pathname: '/me',
          accessToken: authorization,
        });
        return promise.json();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default resolvers;
