import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import AppWrapper from './app-wrapper';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    );
  }
}

export default App;
