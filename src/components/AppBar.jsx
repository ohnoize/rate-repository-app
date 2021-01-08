import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 50,
    backgroundColor: '#666b70',
  },
});

const AppBarTab = ({ text }) => <Text color='textLight'>{text}</Text>;

const AppBar = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <AppBarTab text='Repositories'/>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBar;