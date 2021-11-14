import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router';

interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return isLoggedIn ? <Route {...props} /> : <Navigate replace to="/login" />;
}
