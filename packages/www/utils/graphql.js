export const menuStatusQuery = `
  query isMenuOpen @client {
    isMenuOpen
  }
`;

export const testQuery = `
  query isLogin {
    isLogin
  }
`;

export const GetRandomPhotoQuery = `
  query GetRandomPhotoQuery {
    randomPhoto(collections: 155105) {
      color
      likes
      description
      id
      liked_by_user
      location {
        name
      }
      links {
        html
      }
      urls {
        full
        small
        raw
      }
      user {
        name
        username
        profile_image {
          small
        }
      }
    }
  }
`;

export const likePhotoMutation = `
  mutation likePhoto($id: ID!) {
    likePhoto(id: $id) {
      color
      likes
      description
      id
      liked_by_user
      urls {
        full
        small
        raw
      }
    }
  }
`;

export const downloadPhotoMutation = `
  mutation downloadPhoto($id: ID!) {
    downloadPhoto(id: $id)
  }
`;
