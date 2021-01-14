import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { ADD_REVIEW } from '../graphql/mutations';
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
  owner: '',
  name: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('owner name is required'),
  repositoryName: yup
    .string()
    .required('name is required'),
  rating: yup
    .string()
    .required('rating is required'),
  text: yup
    .string()
});

export const ReviewForm = ({ onSubmit }) => {
  
  return (
    <View style={styles.form}>
      <FormikTextInput testID='ownerName' style={styles.inputField} name='ownerName' placeholder='Owner name' />
      <FormikTextInput testID='repositoryName' style={styles.inputField} name='repositoryName' placeholder='Repository name' />
      <FormikTextInput testID='rating' style={styles.inputField} keyboardType='numeric' name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput testID='text' style={styles.inputField} name='text' placeholder='Review' />
      <View style={styles.button}>
      <TouchableWithoutFeedback testID='submitButton' onPress={onSubmit}>
        <Text color='textLight'>Submit</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const Review = () => {
  
  const history = useHistory();
  const [addReview] = useMutation(ADD_REVIEW);
  const onSubmit = async (values) => {
    
    const { ownerName, repositoryName, rating, text } = values;
    
    try {
    //  console.log(repositoryName);
     const response = await addReview({ variables: { 
       ownerName, 
       repositoryName, 
       text,
       rating: parseInt(rating)
      } });
    //  console.log(data); 
     history.push(`/${response.data.createReview.repositoryId}`);
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
      {({handleSubmit}) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;
