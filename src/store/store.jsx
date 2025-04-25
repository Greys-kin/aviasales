import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filter-slice';
import tabsReducer from './tabs-slice';
import ticketsReducer from './tickets-slice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    tabs: tabsReducer,
    tickets: ticketsReducer,
  },
});

export default store;
