import React, { Component } from 'react';
import CardGridCSS from './CardGridCSS';
import * as Data from './Data';

const CardGrid = CardGridCSS;

class App extends Component {
  render() {
    return (
      <CardGrid shots={Data.shots()}/>
    );
  }
}

export default App;
