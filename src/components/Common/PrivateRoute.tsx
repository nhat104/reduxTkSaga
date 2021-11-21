import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

interface PrivateRouteProps {}

export function PrivateRoute(props: PrivateRouteProps) {
  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return isLoggedIn ? (
    <Routes>
      <Route {...props} />
    </Routes>
  ) : (
    <Navigate replace to="/login" />
  );
}
