import { gql } from 'apollo-server-micro';

const PhotoTypeDefs = gql`
  type Photo {
    id: ID!
    created_at: String!
    updated_at: String!
    width: Int!
    height: Int!
    color: String!
    description: String
    sponsored: Boolean
    likes: Int!
    liked_by_user: Boolean
    slug: String
    user: User!
    links: PhotoLinks!
    urls: PhotoUrls!
    exif: PhotoExif
    location: PhotoLocation
  }

  type PhotoExif {
    make: String!
    model: String!
    exposure_time: String!
    aperture: String!
    focal_length: String!
    iso: Float!
  }

  type PhotoLocation {
    city: String
    country: String
    position: PhotoCoordinates
    name: String
    title: String
  }

  type PhotoCoordinates {
    latitude: Float!
    longitude: Float!
  }

  type PhotoLinks {
    self: String!
    html: String!
    download: String!
    download_location: String!
  }

  type PhotoUrls {
    raw: String!
    full: String!
    regular: String!
    small: String!
    thumb: String!
    custom: String
  }

  type PhotoDownload {
    url: String!
  }

  type Query {
    photos(count: Int, page: Int, orderBy: String, curated: Boolean): [Photo!]!
    randomPhoto(
      count: Int
      collections: Int
      featured: Boolean
      query: String
      width: Int
      height: Int
      username: String
      orientation: String
    ): [Photo!]!
    getPhotoById(id: ID!, width: Int, height: Int): Photo!
  }

  type Mutation {
    likePhoto(id: ID!): Photo!
    downloadPhoto(id: ID!): PhotoDownload!
  }
`;

export { PhotoTypeDefs };
