import { gql } from 'apollo-boost';

export const testQuery = gql`
  query isLogin {
    isLogin
  }
`;

export const GetRandomPhotoQuery = gql`
  query photo {
    randomPhoto(collections: 155105) {
      color
      likes
      description
      id
      urls {
        full
        small
        raw
      }
      user {
        name
        location
        profile_image {
          small
        }
      }
    }
  }
`;

export const likePhotoMutation = gql`
  mutation likePhoto($id: ID!) {
    likePhoto(id: $id) {
      likes
    }
  }
`;

export const downloadPhotoMutation = gql`
  mutation downloadPhoto($id: ID!) {
    downloadPhoto(id: $id)
  }
`;
