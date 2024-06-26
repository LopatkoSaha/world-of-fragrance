import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {store} from './store/rootReducer';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

