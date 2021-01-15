import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE } from '../graphql/queries';

const useSingleRepo = ({ vars }) => {
  const { id, first } = vars;
  const { loading, error, data, fetchMore } = useQuery(GET_SINGLE, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first }
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_SINGLE,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...previousResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ],
            pageInfo: fetchMoreResult.repository.reviews.pageInfo
          }
          }
        };
        return nextResult;
      },
    });

  };

  return { 
    data: data ? data : undefined, 
    fetchMore: handleFetchMore,
    error, 
    loading };
};

export default useSingleRepo;

