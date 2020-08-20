import React from 'react';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Route, Switch } from 'react-router'
import { BrowserRouter, NavLink, withRouter} from 'react-router-dom';
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

function Nav () {
  return (
    <div>
        <NavLink to="/a">
          To A
        </NavLink>
        <br/>
        <NavLink to="/b">
          To B
        </NavLink>
      </div>
  )
}

const ConnectedNav = compose(withRouter, connect(() => { }))(Nav);

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
      <ConnectedNav/>
    </div>
  );
}

const ConnectedApp = compose(withRouter, connect((state) => ({
  counter: state.counter
}), {
  increment: counterSlice.actions.increment
}))(App);

export default ProvidedApp;
