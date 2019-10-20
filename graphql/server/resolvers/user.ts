import { IResolvers } from 'apollo-server-micro';

const UserResolvers: IResolvers = {
  Query: {
    me(_parent, _args, { dataSources }, _info) {
      return dataSources.user.getCurrentUser();
    },
  },
};

export { UserResolvers };
