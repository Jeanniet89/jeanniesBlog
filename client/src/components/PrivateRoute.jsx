import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const writer = sessionStorage.getItem('writer');
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !writer ? <Redirect to="/" /> : <Component {...routeProps} />
      }
    />
  );
};

export default PrivateRoute;
