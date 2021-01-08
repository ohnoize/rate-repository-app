import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';

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
        <Link to='/signin'>
          <AppBarTab text='Sign in'/>
        </Link>
        </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;