import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import TimeLine from './TimeLine'
import imageListMock from './testcollectionlist'

class App extends Component {

  render() {
    return (
      <div className="App">
        <TimeLine data={imageListMock} />
      </div>
    );
  }
}

export default App;
