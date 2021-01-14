import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: error => console.log(error.graphQLErrors[0].message)
    }
  );

  const signIn = async ({ username, password }) => {
    
    const credentials = { username, password };
    const token = await mutate({ variables: { credentials } });
    // console.log(token.data.authorize.accessToken);
    await authStorage.setAccessToken(token.data.authorize.accessToken);
    apolloClient.resetStore();
    return token;
  };

  return [signIn, result];
};

export default useSignIn;