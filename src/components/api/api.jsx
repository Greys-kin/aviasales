import { createAsyncThunk } from '@reduxjs/toolkit';

import { addTickets } from '../../store/tickets-slice';

import { notificationError } from './services/notif-error';

const URL = 'https://aviasales-test-api.kata.academy';

const fetchSearchId = async () => {
  const res = await fetch(`${URL}/search`);
  if (!res.ok) {
    const error = new Error('Ошибка при загрузке searchId');
    error.response = res;
    throw error;
  }
  const data = await res.json();
  return data.searchId;
};

const fetchTicketsBatch = async (searchId) => {
  const res = await fetch(`${URL}/tickets?searchId=${searchId}`);
  if (!res.ok) {
    const error = new Error(`Ошибка при загрузке билетов: ${res.statusText}`);
    error.response = res;
    throw error;
  }
  return await res.json();
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch }) => {
  let searchId;
  try {
    searchId = await fetchSearchId();
  } catch (error) {
    if (error.response?.status < 500) {
      notificationError('Ошибка при получении searchId');
      return;
    }
    throw error;
  }
  let stop = false;

  while (!stop) {
    try {
      const { tickets, stop: batchStop } = await fetchTicketsBatch(searchId);
      console.log('Полученных билетов:', tickets.length);
      console.log('Поиск завершен', batchStop);
      if (tickets.length > 0) {
        dispatch(addTickets(tickets));
      }
      stop = batchStop;
    } catch (error) {
      if (error.response.status >= 500) {
        continue;
      } else {
        notificationError('Произошла ошибка');
        return;
      }
    }
  }
  console.log('Поиск билетов завершен');
});
