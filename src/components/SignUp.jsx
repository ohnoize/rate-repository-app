import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';


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
  password: '',
  confirmPassword: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords need to match')
    .required('password confirmation required')
});

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput testID='username' style={styles.inputField} name='username' placeholder='Username' />
      <FormikTextInput testID='password' style={styles.inputField} name='password' placeholder='Password' secureTextEntry={true} />
      <FormikTextInput testID='confirmPassword' style={styles.inputField} name='confirmPassword' placeholder='Confirm Password' secureTextEntry={true} />
      <View style={styles.button}>
      <TouchableWithoutFeedback testID='submitButton' onPress={onSubmit}>
        <Text color='textLight'>Sign up</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);
  const onSubmit = async (values) => {
    const { username, password } = values;
    // console.log(username, password);
    try {
      await createUser({ variables: { username, password } });
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
      {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignUp;