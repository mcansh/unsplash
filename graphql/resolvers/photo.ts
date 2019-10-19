import { IResolvers } from 'apollo-server-micro';

const PhotoResolvers: IResolvers = {
  Query: {
    randomPhoto: (_parent, args, { dataSources }, _info) =>
      dataSources.photo.getRandomPhotos(args),

    getPhotoById: (_parent, args, { dataSources }) =>
      dataSources.photo.getPhotoById(args),
  },
};

export { PhotoResolvers };
