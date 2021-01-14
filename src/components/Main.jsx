import React from 'react';
  // import Constants from 'expo-constants';
import { View , StyleSheet} from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import RepositoryPage from './RepositoryPage';
import Review from './Review';
import SignIn from './SignIn';
import SignUp from './SignUp';
// import Text from './Text';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1, 
    flexShrink: 1
  }
});

const Main = () => {
  
  return(
    <>
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/review' exact>
          <Review />
        </Route>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path='/signup' exact>
          <SignUp />
        </Route>
        <Route path='/:id' exact>
          <RepositoryPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
    </>
  );
};

export default Main;
