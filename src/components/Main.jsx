import React from 'react';
  // import Constants from 'expo-constants';
import { View , StyleSheet} from 'react-native';
import RepositoryList from './RepositoryList';
// import Text from './Text';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8'
  }
});

const Main = () => {
  return(
    <>
    <View style={styles.backgroundColor}>
      <AppBar />
      <RepositoryList />
    </View>
    </>
  );
};

export default Main;