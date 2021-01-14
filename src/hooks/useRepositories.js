// import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ vars }) => {
  


  const { orderBy, orderDirection, searchKeyword, first } = vars;
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword, first }
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...vars
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges
            ],
          },
        };
        return nextResult;
      },
    });

  };

  return { 
    repositories: data ? data.repositories : undefined, 
    fetchMore: handleFetchMore,
    error, 
    loading };
};

export default useRepositories;
