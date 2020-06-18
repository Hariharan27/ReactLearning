import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Menu from '../components/menu/Menu';

import Dashboard from '../container/dashboard/Dashboard';

import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/css/bootstrap.min.css';


const store = configureStore();


ReactDOM.hydrate(
    <ReduxProvider store={store}>
      <Menu></Menu>
      <Dashboard/>
    </ReduxProvider>,
    document.getElementById('root')
);
