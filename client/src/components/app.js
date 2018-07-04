import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import AppWrapper from './app-wrapper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faChevronRight, faChevronLeft);

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
