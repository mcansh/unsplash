import { IResolvers } from 'apollo-server-micro';

const PhotoResolvers: IResolvers = {
  Query: {
    randomPhoto(_parent, args, { dataSources }, _info) {
      return dataSources.photo.getRandomPhotos(args);
    },

    getPhotoById(_parent, args, { dataSources }, _info) {
      return dataSources.photo.getPhotoById(args);
    },
  },

  Mutation: {
    downloadPhoto(_parent, args, { dataSources }, _info) {
      return dataSources.photo.downloadPhoto(args);
    },

    likePhoto(_parent, args, { dataSources }, _info) {
      return dataSources.photo.likePhoto(args);
    },
  },
};

export { PhotoResolvers };
