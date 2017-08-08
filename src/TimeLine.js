import React, { Component } from 'react'
import './TimeLine.css'

import { scaleTime } from 'd3-scale'
import { extent } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom } from 'd3-axis'

class TimeLine extends Component {

  componentDidMount() {
    this.createTimeLine()
  }

  componentDidUpdate() {
    this.createTimeLine()
  }

  createTimeLine = () => {

    let data = this.props.data

    data.forEach(d => {
      const time_start = d.properties['system:time_start']
      d.properties['system:time_start'] = new Date(time_start)
    })

    let node = this.node,
      width = node.parentNode.clientWidth,
      height = node.parentNode.clientHeight,
      margin = this.props.margin || 10,
      chartWidth = width - margin * 2,
      chartHeight = height - margin * 2,
      chart,
      plotArea,
      xScale,
      xAxis,
      dataExtent

    dataExtent = extent(data, d => {
      return d.properties['system:time_start']
    })
    let startDate = new Date(dataExtent[0].getTime()),
      endDate = new Date(dataExtent[1].getTime())
    startDate.setDate(startDate.getDate() - 5)
    endDate.setDate(startDate.getDate() + 5)
    xScale = scaleTime()
      .domain([startDate, endDate])
      .range([margin, chartWidth - margin])

    xAxis = axisBottom(xScale)

    select(node)
      .attr('width', width)
      .attr('height', height)

    chart = select(node)
      .append('g')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', 'translate(' + margin + ',' + margin + ')')

    chart
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + chartHeight / 2 + ')')
      .call(xAxis)

    plotArea = chart
      .append('g')
      .attr('clip-path', 'url(#clip)')

    plotArea.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')

    plotArea.selectAll('circle')
      .data(data)
      .exit()
      .remove()

    plotArea.selectAll('circle')
      .data(data)
      .style('fill', 'white')
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .attr('r', 5)
      .attr('cx', d => {
        return xScale(d.properties['system:time_start'])
      })
      .attr('cy', chartHeight / 2)

    plotArea.selectAll('circle')
      .on('mouseover', d => {
        console.log(d.properties)
      })

  }

  render() {
    return (
      <div className="timeline-container">
        <svg ref={node => this.node = node} />
      </div>
    )
  }
}

export default TimeLine
