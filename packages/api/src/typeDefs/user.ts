import { gql } from 'apollo-server-micro';

export default gql`
  type User {
    id: ID!
    updated_at: String!
    username: String!
    name: String!
    first_name: String!
    last_name: String!
    twitter_username: String
    portfolio_url: String
    bio: String
    location: String
    instagram_username: String
    total_collections: Int!
    total_likes: Int!
    total_photos: Int!
    profile_image: UserProfileImage!
    links: UserLinks!
  }

  type UserProfileImage {
    small: String!
    medium: String!
    large: String!
  }

  type UserLinks {
    self: String!
    html: String!
    photos: String!
    likes: String!
    portfolio: String!
    following: String!
    followers: String!
  }

  extend type Query {
    me: User!
  }
`;
