import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';

import App from '../src/components/app/app';

import './index.scss';
import store from './store/store';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
