import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';


const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 5
  },
  form: {
    flexGrow: 1,
    padding: 15,
    justifyContent: 'flex-start',
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  password: yup
    .string()
    .required('password is required')
});


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
  const history = useHistory();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
    
  };
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignIn;