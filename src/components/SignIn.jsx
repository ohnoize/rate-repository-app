import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5
  },
  form: {
    padding: 10,
    justifyContent: 'space-evenly',
    height: 170
  },
  button: {
    backgroundColor: '#0366d6',
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center'
  }
});

const initialValues = {
  username: '',
  password: ''
};


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput style={styles.inputField} name='username' placeholder='Username' />
      <FormikTextInput style={styles.inputField} name='password' placeholder='Password' secureTextEntry={true} />
      <View style={styles.button}>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text color='textLight'>Sign in</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignIn;