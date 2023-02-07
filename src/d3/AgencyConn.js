import React, { Component } from 'react'
import { select } from 'd3-selection'
import { chord, ribbon } from 'd3-chord'
import { descending } from 'd3-array'
import { interpolateCubehelixDefault} from 'd3-scale-chromatic'
import { arc } from 'd3-shape'

import mpic from './../klamath-mouth.png';

class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    const colors = interpolateCubehelixDefault
    const alphacolor='rgba(198, 45, 205,0)'
    const node = this.node
    const matrix=this.props.data.tbl
    const ir= this.props.size[0]*.45
    const orv=ir*1.108
    const transv=ir*1.11
    const chord_d= chord()
      .padAngle(0.05)
      .sortSubgroups(descending)
      (matrix)
   select(node)
       .selectAll("svg > *").remove()  
   select(node)
      .datum(chord_d)
      .append("g")
      .attr("transform", "translate("+ transv + ","+ transv +")")
      .selectAll("g")
      .data(function(d) { return d.groups; })
      .enter()
      .append("g")
      .append("path")
    .style("fill", function(d,i){ return colors(i/matrix.length) })
    .style("stroke", "black")
    .attr("d", arc()
      .innerRadius(ir)
      .outerRadius(orv)
      )
   
    select(node)
      .datum(chord_d)
      .append("g")
      .attr("transform", "translate("+ transv + ","+ transv +")")
      .selectAll("path")
      .data(function(d) { return d; })
      .enter()
      .append("path")
        .attr("d", ribbon()
          .radius(ir)
        )
        .style("fill", function(d){ if(d.source.index!==d.target.index) {return(colors(d.source.index/matrix.length))} else{return alphacolor} }) // colors depend on the source group. Change to target otherwise.
        .style("stroke", "black")
        
     }   
  render() {
    return <div style={{ paddingTop:'2em' }} ><svg ref={node => this.node = node}
            width={this.props.size[0]} height={this.props.size[1]}
            style={{ backgroundImage: `url(${mpic})` }} id = "agency-d3">
    </svg></div>
  }
}

export default BarChart
