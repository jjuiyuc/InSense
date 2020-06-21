import React from "react";
import ReactDOM from "react-dom";
//import react router, add by pegggy on 6/21
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';


//import store by peggy 6/21
import store from './components/Redux/store';
import App from "./App";
// import App from './Test';
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
