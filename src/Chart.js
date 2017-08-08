import React, { Component } from 'react'
import TimeLine from './TimeLine'

import imageListMock from './testcollectionlist'

class Chart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    this.setState({
      width: this.div.clientWidth,
      height: this.div.clientHeight
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div
        className="timeline-container"
        ref={d => this.div = d}>
        <TimeLine
          data={imageListMock} 
          margin={10}
        />
      </div>
    )
  }
}

export default Chart