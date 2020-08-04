import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { RootState } from '../reducers';
import { User } from '../interfaces/user';
import { History } from 'history';
import { ThunkDispatch } from 'redux-thunk';
import { Formik, Field, FieldProps } from 'formik';
import { Button, FormControl, FormLabel, Input, FormErrorMessage, Box } from '@chakra-ui/core';
import { useHistory, RouteComponentProps } from 'react-router-dom';

const mapState = (state: RootState) => ({
  auth: state.auth
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loginUser: (userData: User, history: History, path: string) =>
    dispatch(loginUser(userData, history, path))
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;

interface FormValues {
  email: string;
  password: string;
}

const Login: FC<Props> = props => {
  const returnPath = props.location?.state?.returnTo;
  const history = useHistory();

  const validate = async (values: FormValues) => {
    let error;

    if (!values.email) {
      error = 'Email is required';
    }

    if (!values.password) {
      error = 'Password is required';
    }

    return error;
  };

  const submitHandler = async (values: FormValues) => {
    await props.loginUser(values, history, returnPath);
  };

  return (
    <Box maxWidth={500} mx="auto" my={5}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={submitHandler}
        validate={validate}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email">
              {({ field, form }: FieldProps) => {
                return (
                  <FormControl isInvalid={!!form.errors.email && form.touched.email === true}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>

            <Field name="password">
              {({ field, form }: FieldProps) => {
                return (
                  <FormControl
                    isInvalid={!!form.errors.password && form.touched.password === true}
                    mt={5}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} id="password" placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>

            <Button mt={4} variantColor="teal" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default connector(Login);
