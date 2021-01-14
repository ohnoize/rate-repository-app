import { gql } from 'apollo-boost';
import { REPOSITORY_ITEMS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...RepositoryItems
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
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
      reviews {
        edges {
          node {
            repository {
              name
            }
            rating
            text
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_SINGLE = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryItems,
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
${REPOSITORY_ITEMS}  
`;