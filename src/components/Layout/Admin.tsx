import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import { Route, Routes } from 'react-router-dom';
import Dashboard from 'features/dashboard';
import Student from 'features/student';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
    borderBottom: '1px solid #ccc',
  },

  sidebar: {
    gridArea: 'sidebar',
    borderRight: '1px solid #ccc',
  },

  main: {
    gridArea: 'main',
    padding: '16px 24px',
  },
});

export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students/*" element={<Student />} />
        </Routes>
      </Box>
    </Box>
  );
}
