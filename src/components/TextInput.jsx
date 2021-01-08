import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 35
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle =[style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;