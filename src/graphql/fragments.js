import { gql } from 'apollo-boost';

export const REPOSITORY_ITEMS = gql`
  fragment RepositoryItems on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    url
  }
`;