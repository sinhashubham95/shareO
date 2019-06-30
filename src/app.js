import React, { Component } from 'react';
import AppContainer from './navigator';

export default class App extends Component {
  render() {
    return (
      <AppContainer
        uriPrefix="/app"
      />
    );
  }
}