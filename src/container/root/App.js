import React from 'react';
import { Provider } from "react-redux";
import store from '../../redux/store/index'
import Dashboard from '../dashboard/Dashboard'
import Menu from '../../components/menu/Menu'

function App() {
  return (
    <Provider store={store}>
      <Menu></Menu>
      <Dashboard/>
  </Provider>
  );
}

export default App;
