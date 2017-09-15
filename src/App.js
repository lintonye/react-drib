import React, { Component } from 'react';
import CardGridCSS from './CardGridCSS';
import CardGridSC from './CardGridSC';
import * as Data from './Data';

const CardGrid = CardGridSC;

class App extends Component {
  render() {
    return (
      <CardGrid shots={Data.shots()}/>
    );
  }
}

export default App;
