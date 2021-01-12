import { gql } from 'apollo-boost';
import { REPOSITORY_ITEMS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryItems
        }
      }
    }
  }
${REPOSITORY_ITEMS}
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_SINGLE = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryItems,
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
${REPOSITORY_ITEMS}  
`;