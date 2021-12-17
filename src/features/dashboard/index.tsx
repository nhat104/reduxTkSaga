import {
  ChatBubble,
  ChatRounded,
  LinearScaleSharp,
  PeopleAlt,
} from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticsItem from './components/StatisticsItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCity,
} from './dashboardSlice';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    paddingTop: '8px',
  },

  loading: {
    position: 'absolute',
    width: '100%',
    top: '-8px',
  },
});

export default function Dashboard() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCity = useAppSelector(selectRankingByCity);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistic section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticsItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticsItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="make >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticsItem
            icon={<LinearScaleSharp fontSize="large" color="primary" />}
            label="make <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All Students ranking */}
      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Rankings by city */}
      <Box mt={4}>
        <Typography variant="h4">Rankings by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCity.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
