import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastRefreshedAt: null,
  activeAlertNotification: null,
};

const adminOverviewSlice = createSlice({
  name: 'adminOverview',
  initialState,
  reducers: {
    logRefreshTime: (state) => {
      state.lastRefreshedAt = new Date().toISOString();
    },
    dismissAlert: (state) => {
      state.activeAlertNotification = null;
    }
  },
});

export const { logRefreshTime, dismissAlert } = adminOverviewSlice.actions;
export default adminOverviewSlice.reducer;