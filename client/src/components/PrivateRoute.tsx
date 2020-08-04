import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers';

const mapState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux &
  RouteProps & {
    component: any;
    isAuthenticated: boolean;
    adminRequired: boolean;
  };

const PrivateRoute = (props: Props) => {
  const { component: Component, isAuthenticated, adminRequired = false, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          adminRequired ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { returnTo: rest.path }
            }}
          />
        )
      }
    />
  );
};

export default connector(PrivateRoute);
