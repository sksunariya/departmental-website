import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { configureStore } from '@reduxjs/toolkit';
import AppContextProvider from './services/apiLinks/blogsAPI';

const store = configureStore({reducer: rootReducer});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <BrowserRouter>
        <AppContextProvider>
          <App/>
        </AppContextProvider>
        <Toaster/>
      </BrowserRouter>
    </Provider>

);
