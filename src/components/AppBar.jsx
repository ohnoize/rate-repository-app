import React from 'react';
import { useContext, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 70,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    flexDirection: 'row',
    flexGrow: 1,
    alignContent: 'flex-start',
    justifyContent: 'space-evenly',
    padding: 5,
  },
});

const AppBarTab = ({ text }) => <Text color='textLight'>{text}</Text>;

const AppBar = () => {
  
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const loggedUser = useQuery(AUTHORIZED_USER, {
    refetchQueries: 5000
  });
  // console.log(loggedUser.data);
  const [, setToken] = useState(null);
 

  
  const handleLogOut = async (event) => {
    // console.log('Loggin out');
    event.preventDefault();
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    setToken(null);
  };

  let showIfLogged = 'none';
  let hideIfLogged = '';

  if (loggedUser?.data?.authorizedUser) {
    showIfLogged = '';
    hideIfLogged = 'none';
  }

  
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
      <View>
        <TouchableWithoutFeedback>
        <Link to='/'>
          <AppBarTab text='Repositories'/>
        </Link>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TouchableWithoutFeedback>
          <Link to='/review'>
            <AppBarTab text='Create a review'/>
          </Link>
        </TouchableWithoutFeedback>
      </View> 
      <View display={hideIfLogged}>
        <TouchableWithoutFeedback>
          <Link to='/signin'>
            <AppBarTab text='Sign in'/>
          </Link>
        </TouchableWithoutFeedback>
      </View>
      <View display={hideIfLogged}>
        <TouchableWithoutFeedback>
          <Link to='/signup'>
            <AppBarTab text='Sign Up'/>
          </Link>
        </TouchableWithoutFeedback>
      </View>
      <View display={showIfLogged}>
        <TouchableWithoutFeedback>
          <Link to='/' onPress={handleLogOut}>
            <AppBarTab text='Sign out'/>
          </Link>
        </TouchableWithoutFeedback>
      </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
