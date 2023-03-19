import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"
import MainLoader from "./components/MainLoader"

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
          <BrowserRouter>
            <Suspense
                fallback={
                  <MainLoader />
                }
              >
              <App />
            </Suspense>
          </BrowserRouter>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
  </React.StrictMode>
);


