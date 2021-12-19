import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams } from 'models';
import React, { useEffect } from 'react';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    paddingTop: '10px',
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },

  loading: {
    position: 'absolute',
    top: '-10px',
    width: '100%',
  },
});

export default function ListPage() {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityList = useAppSelector(selectCityList);
  const cityMap = useAppSelector(selectCityMap);

  const classes = useStyles();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChange = (event: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <StudentTable studentList={studentList} cityMap={cityMap} />

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
