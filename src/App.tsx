import { NotFound } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/admin" element={<PrivateRoute />}> */}
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
