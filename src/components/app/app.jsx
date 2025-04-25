import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchTickets } from '../../components/api/api';
import Filter from '../../components/filter/filter';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';
import TicketsList from '../../components/ticket-list/ticket-list';

import styles from './app.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Logo />
      <main className={styles.main}>
        <Filter />
        <article className={styles.article}>
          <Tabs />
          <TicketsList />
        </article>
      </main>
    </div>
  );
}

export default App;
