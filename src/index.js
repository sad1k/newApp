import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppRoute from './AppRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Login from './components/Login/Login';
import Header from './components/Header';

const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    
    <ThemeProvider theme={darkTheme}>
      <Header />
        <Routes>
        <Route path="/euleriancycle" />
        <Route path="/course" element={<MainPage />} />
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login isRegistered={true}/>} />
        <Route path='/register' element={<Login isRegistered={false}/>} />
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
