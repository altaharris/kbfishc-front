import React, { Component } from 'react'
import { select } from 'd3-selection'
import { arc } from 'd3-shape'
import { path } from 'd3-path'
import { scaleLinear , scaleOrdinal} from 'd3-scale'
import { schemePaired, interpolateViridis } from 'd3-scale-chromatic'
import { interpolateHcl, interpolate, quantize } from 'd3-interpolate'
import { hcl } from 'd3-color'
import { format } from 'd3-format'
import { partition, hierarchy } from 'd3-hierarchy'
import { max } from 'd3-array' 
import transition from 'd3-transition';

class SunburstPlot extends Component {
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
    const formatNumber = format(',d');
    const node = this.node
    const data=this.props.data
    const height=this.props.width
    const width=this.props.width
    const radius = width / 6
    const arcv = arc()
		.startAngle(d => d.x0)
		.endAngle(d => d.x1)
		.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
		.padRadius(radius * 1.5)
		.innerRadius(d => d.y0 * radius)
		.outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
	
    const arcvH = arc()
		.startAngle(d => d.x0)
		.endAngle(d => d.x1)
		.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
		.padRadius(radius * 1.5)
		.innerRadius(d => d.y0 * radius)
		.outerRadius(d => d.y0 * radius *1.2)
		
    const color = scaleOrdinal(quantize(interpolateViridis, data.children.length + 1))
   
    function flatten(root) {
		var nodes = [], i = 0;  
		
		function recurse(node, depth) {     
			node.depth = depth;
			if (node.children) 
				node.children.forEach(function(n){  
					recurse(n,node.depth+1); 
				});
			if (!node.id) 
				node.id = ++i;
			nodes.push(node);
		}
		recurse(root,0);
		const depthvals =nodes.map((s) => s.depth)
		return max(depthvals);
	}
    function nodecolor(maxdepth, depth, color_inp){
         const startColor = hcl(color_inp).darker(2);
         const endColor   = hcl(color_inp).brighter(5);
         const colors = scaleLinear()
                        .interpolate(interpolateHcl)
                        .range([
                            startColor.toString(),
                            endColor.toString()
                        ])
                        .domain([0,maxdepth+1]);
         return colors(depth)
      } 
    function partitiondata(){
	  const root = hierarchy(data)
		  .sum(d => d.size)
		  .sort((a, b) => b.size - a.size);
	  return partition()
		  .size([2 * Math.PI, root.height + 1])
		(root);

		};
		
	const root = partitiondata(data);

    root.each(d => d.current = d);
    
    const maxnd=flatten(root);

      select(node)
       .selectAll("svg > *").remove()
       
	  const svg = select(node)
		  .attr("viewBox", [0, 0, width, width])
		  .attr("width", width)
		  .attr("height", height)
		  .style("font", "14px sans-serif");

	  const g = svg.append("g")
		  .attr("transform", `translate(${width / 2},${width / 2})`);

	  const path = g.append("g")
		.selectAll("path")
		.data(root.descendants().slice(1))
		.join("path")
		  .attr("fill", d => {const dpv=d.depth; while (d.depth > 1) d = d.parent; return nodecolor(maxnd,dpv, color(d)); })
		  .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 1 : 0.8) : 0)
		  .attr("d", d => arcv(d.current));

	  path.filter(d => d.children)
		  .style("cursor", "pointer")
		  .on("click", clicked);

	  path.append("title")
		  .text(d => `${d.ancestors().filter(dd => d.data.name.length>0).map(d => d.data.name).reverse().join(">>")}>>${formatNumber(d.value)}`);
      g.append("g")
		.selectAll("path")
		.data(root.descendants().slice(1))
		.join("path")
		  .attr('id', (_, i) => `hiddenArc${i}`)
          .attr('class', 'hidden-arc')
		  .attr("d", d => arcvH(d.current));
		  
	  const label = g.append("g")
		 .attr("pointer-events", "none")
		 .attr("text-anchor", "middle")
		 .style("user-select", "none")
	     .selectAll("text")
		.data(root.descendants().slice(1))
		.join("text")
		   .attr("text-anchor","middle")
		  .attr("fill", "#fff")
          .attr("fill-opacity", d => +labelVisible(d.current))
          .append("textPath")
          .attr('startOffset','20%')
		  .attr("href", (_, i) => `#hiddenArc${i}` )
		  .text(d => (d.data.name==="")?  "":d.data.name);
      
      const parentH = g.append("circle")
		  .datum(root)
		  .attr("r", radius/2)
		  .attr("class", "hidden-arc")
          .attr("id", "hiddenCenter")
          
	  const parent = g.append("circle")
		  .datum(root)
		  .attr("r", radius)
		  .attr("fill", "none")
		  .attr("pointer-events", "all")
		  .on("click", clicked)
		  .append("text")
		  .attr("text-anchor","middle")
		  .attr("fill", "#666")
		  .append("textPath")
		  .attr("href", (_, i) => "#hiddenCenter" )
		  .text("TEST")
		  ;

	  function clicked(event, p) {
		parent.datum(p.parent || root);

		root.each(d => d.target = {
		  x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
		  x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
		  y0: Math.max(0, d.y0 - p.depth),
		  y1: Math.max(0, d.y1 - p.depth)
		});

		const t = g.transition().duration(750);

		// Transition the data on all arcs, even the ones that aren’t visible,
		// so that if this transition is interrupted, entering arcs will start
		// the next transition from the desired position.
		path.transition(t)
			.tween("data", d => {
			  const i = interpolate(d.current, d.target);
			  return t => d.current = i(t);
			})
		  .filter(function(d) {
			return +this.getAttribute("fill-opacity") || arcVisible(d.target);
		  })
			.attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
			.attrTween("d", d => () => arcv(d.current));

		label.filter(function(d) {
			return +this.getAttribute("fill-opacity") || labelVisible(d.target);
		  }).transition(t)
			.attr("fill-opacity", d => +labelVisible(d.target));
	  }
	  
	  function arcVisible(d) {
		return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
	  }

	  function labelVisible(d) {
		return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.3;
	  }

	  function labelTransform(d) {
		const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
		const y = (d.y0 + d.y1) / 2 * radius;
		return `rotate(${x - 90}) translate(${y},0) rotate(90)`;
	  }
		
	}
  render() {
    return <div style={{ paddingTop:'2em' }} ><svg ref={node => this.node = node}
                 id = "sunburst-d3">
    </svg></div>
  }
}

export default SunburstPlot
