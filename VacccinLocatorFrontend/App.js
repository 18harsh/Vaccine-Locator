import React, { Component } from "react";

import NavigationContainerModule from "./Navigation/NavigationContainer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import { Provider } from "react-redux";

const rootReducer = combineReducers({

  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <NavigationContainerModule />
      </Provider>
    );

  };

}


