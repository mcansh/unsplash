import { PhotoResolvers } from '~/graphql/server/resolvers/photo';
import { UserResolvers } from '~/graphql/server/resolvers/user';

const resolvers = [PhotoResolvers, UserResolvers];

export { resolvers };
