import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput) {
    authorize(
      credentials: $credentials
    ) {
      accessToken
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: {
      repositoryName: $repositoryName
      ownerName: $ownerName
      rating: $rating
      text: $text
    }
    ) {
      repositoryId
      createdAt
      text
    }
  }
`;