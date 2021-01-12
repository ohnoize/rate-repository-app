import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInForm } from '../components/SignIn';
import { Formik } from 'formik';
import FormikTextInput from '../components/FormikTextInput';
import * as yup from 'yup';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when valid form is submitter', async () => {
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

      const SignInContainer = ({ onSubmit }) => {
        const handleSubmit = async (values) => {
         const { username, password } = values;
         await onSubmit({username, password});
        }
       
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


      

      const onSubmit = jest.fn()
      const { getByTestId, debug } = render(<SignInContainer onSubmit={onSubmit} />)

      act(() => {
       fireEvent.changeText(getByTestId('username'), 'kalle');
      });
      act(() => {
       fireEvent.changeText(getByTestId('password'), 'password');
      })
      act(() => {
       fireEvent.press(getByTestId('submitButton'));
      })
      await waitFor(() => { 
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password'
        });
      });
     
      
    })
  })
})

