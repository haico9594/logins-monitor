import React, {useEffect } from 'react';
import './App.css';
import { LoginPage, LoginsTable} from './components';
import { getLoggedUser } from './helpers';

function App() {
  let loggedUser = getLoggedUser();
  if (loggedUser) {
      return <LoginsTable/>;
  }

  return <LoginPage/>
}

export default App;
