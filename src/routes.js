// LIBRARY
import React from 'react';
import {Route, Routes} from 'react-router-dom';

// COMPONENT
import App from './App';
import { LoginPage } from './components';
import { LoginsTable } from './components';


export default (
    <Routes>
      <Route element={<App/>} path='/' exact/>
      <Route element={<LoginPage/>} path='/login' />
      <Route element={<LoginsTable/>} path='/loginstable' />
    </Routes>
);