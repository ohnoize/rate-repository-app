import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 35
  },
  error: {
    borderColor: '#d73a4a'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    error && styles.error
  ];
  
  return <NativeTextInput autoCapitalize={'none'} style={textInputStyle} {...props} />;
};

export default TextInput;