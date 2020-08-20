import React from 'react';
import { Provider, connect } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Route, Switch } from 'react-router'
import { BrowserRouter, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {counter: 0},
  reducers: {
    increment: state => ({counter: state.counter + 1}),
  }
})

const store = configureStore({
  reducer: counterSlice.reducer
})

function ProvidedApp () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedApp/>
      </BrowserRouter>
    </Provider>
  )
}

function App(props) {
  let { counter, increment } = props;
  return (
    <div>
      <Switch>
          <Route path="/a">
            <div>
              Route A?
              counter: {counter}
              <button onClick={increment}>increment</button>
            </div>
          </Route>
          <Route path="/b">
            <div>
              Route B?
              counter: {counter}
              <button onClick={increment}>increment</button>
            </div>
          </Route>
      </Switch>
      <div>
        <NavLink to="/a">
          To A
        </NavLink>
        <br/>
        <NavLink to="/b">
          To B
        </NavLink>
      </div>
    </div>
  );
}

const ConnectedApp = connect((state) => ({
  counter: state.counter
}), {
  increment: counterSlice.actions.increment
})(App);

export default ProvidedApp;
