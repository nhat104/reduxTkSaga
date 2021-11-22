import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCity,
} from './dashboardSlice';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCity = useAppSelector(selectRankingByCity);

  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCity,
  });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return <div>Dashboard</div>;
}
