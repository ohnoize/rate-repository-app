// import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  
  // const [loading, setLoading] = useState(false);

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  // const fetchRepositories = async () => {
  //   setLoading(true);
  //   const response = await fetch('http://192.168.1.156:5000/api/repositories');
  //   const json = await response.json();
  //   setRepositories(json);
  //   setLoading(false);
  // };

  return { repositories: data.repositories, error, loading };
};

export default useRepositories;