import React from 'react';
import { Provider, connect } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
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
      <ConnectedApp/>
    </Provider>
  )
}

function App(props) {
  let { counter, increment } = props;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={increment}>increment</button>
        counter: {counter}
      </header>
    </div>
  );
}

const ConnectedApp = connect((state) => ({
  counter: state.counter
}), {
  increment: counterSlice.actions.increment
})(App);

export default ProvidedApp;
