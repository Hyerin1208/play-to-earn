import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducers/index";

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer, composeWithDevTools())}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
