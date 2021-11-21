import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardData(state) {
      state.loading = true;
    },
    fetchDashboardDataSuccess(state) {
      state.loading = false;
    },
    fetchDashboardDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

// Actions
export const {
  fetchDashboardData,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailed,
  setStatistics,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
} = dashboardSlice.actions;

// Selectors
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) =>
  state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) =>
  state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) =>
  state.dashboard.lowestStudentList;
export const selectRankingByCity = (state: RootState) =>
  state.dashboard.rankingByCityList;

// Reducer
export default dashboardSlice.reducer;
