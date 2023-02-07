import React, { Component } from 'react'
import * as d3 from 'd3'

import './d3.css'

class SunburstPlot extends Component {
  constructor(props){
    super(props)
    this.createSunburstChart = this.createSunburstChart.bind(this)
  }

  componentDidMount() {
    this.createSunburstChart()
  }

  componentDidUpdate() {
    this.createSunburstChart()
  }

  createSunburstChart() {
	const data = this.props.data
	const node = this.node
    const color = function(d) {
            var colors;
            if (!d.parent) {
		     	colors = d3.scaleOrdinal(d3.schemeCategory10)
                d.color = "#ffffff";
            } else if (d.children) {
                var startColor = d3.hcl(d.color)
                                    .darker(),
                    endColor   = d3.hcl(d.color)
                                    .brighter();
                colors = d3.scaleLinear()
                        .interpolate(d3.interpolateHcl)
                        .range([
                            startColor.toString(),
                            endColor.toString()
                        ])
                        .domain([0,d.children.length+1]);
            }
            if (d.children) {
                d.children.map(function(child, i) {
                    return {value: child.value, idx: i};
                }).sort(function(a,b) {
                    return b.value - a.value
                }).forEach(function(child, i) {
                    d.children[child.idx].color = colors(i);
                });
            }
            return d.color;
        };
        
        
        const width = this.props.width,
            height = this.props.height *.7
            
        const bcheight = height*0.05;
        const bcboxheight=bcheight*1.1
        
        const svgheight=height-bcboxheight
        const maxRadius = (Math.min(width, svgheight))*.4;
        
        const formatNumber = d3.format(',d');

        const x = d3.scaleLinear()
            .range([0, 2 * Math.PI])
            .clamp(true);

        const y = d3.scaleLinear()
            .range([maxRadius*.05, maxRadius]);

        const partition = d3.partition();

        const arc = d3.arc()
            .startAngle(d => x(d.x0))
            .endAngle(d => x(d.x1))
            .innerRadius(d => Math.max(0, y(d.y0)))
            .outerRadius(d => Math.max(0, y(d.y1)));

        const middleArcLine = d => {
            const halfPi = Math.PI/2;
            const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
            const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

            const middleAngle = (angles[1] + angles[0]) / 2;
            const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
            if (invertDirection) { angles.reverse(); }

            const path = d3.path();
            path.arc(0, 0, r, angles[0], angles[1], invertDirection);
            return path.toString();
        };

        const textFits = d => {
            const CHAR_SPACE = 10;

            const deltaAngle = x(d.x1) - x(d.x0);
            const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
            const perimeter = r * deltaAngle;

            return d.data.name.length * CHAR_SPACE < perimeter;
        };
        d3.select(node)
          .selectAll("svg > *").remove().exit();
        const svg = d3.select(node)
            .attr("height", svgheight)
            .attr("width", width)
            .attr('viewBox', `${-width / 2} ${-svgheight / 2} ${width} ${svgheight}`)
            .on('click', () => focusOn()) // Reset zoom on canvas click
			.attr('id', 'container');
        

        
		var root = d3.hierarchy(data)
			.sum(function ( d) { return d.size})
			.sort(function( a, b) { return b.value - a.value; });
		console.log(root)
			
		var nodes = partition(root).descendants()
			.sort(function(a, b) { return b.value - a.value; });
			
		console.log(nodes)
		
		initializeBreadcrumbTrail();

            const slice = svg.selectAll('g.slice')
                .data(nodes);
			
			slice.sort(function(event, a, b) { return b.value - a.value; });

            slice.exit().remove();

            const newSlice = slice.enter()
                .append('g').attr('class', 'slice')
				.sort(function(a, b) { return b.value - a.value; })
                .on('click', (event, d) => {
                    event.stopPropagation();
                    focusOn(d);
                })
				.on('mouseover',  (event, d) => {showtooltip(d); fademouseover(d);})
				;

            var tooltip = d3.select('#tooltip')
               .selectAll("div > *").remove().exit()
				.append('div').classed('tooltip', true);
			  tooltip.append('div')
				.attr('class', 'sp'); 	
			  tooltip.append('div')
				.attr('class', 'rel');              
			  tooltip.append('div')           
				.attr('class', 'recap');
			  tooltip.append('div')           
				.attr('class', 'norecap');
			  tooltip.append('div')
				.attr('class', 'percent');
			  tooltip.append('div')
				.attr('class', 'percentrecap');

            newSlice.append('path')
                .attr('class', 'main-arc')
                .style('fill', color)
                .attr('d', arc)
				  .on('mouseover',  (event,d) => {showtooltip(d); fademouseover(d);})
				  .on('mouseout', function() {                    
					  tooltip.style('display', 'none');
					})
				  .on('mousemove', function(event, d) { // when mouse moves                  
					  tooltip.style('top', (event.layerY + 10) + 'px'); // always 10px below the cursor
					  tooltip.style('left', (event.layerX + 10) + 'px'); // always 10px to the right of the mouse
						});
									

            newSlice.append('path')
                .attr('class', 'hidden-arc')
                .attr('id', (_, i) => `hiddenArc${i}`)
                .attr('d', middleArcLine);

            const text = newSlice.append('text')
                .attr('display', d => textFits(d) ? null : 'none')
				.attr('fill', 'white');

            text.append('textPath')
                .attr('startOffset','50%')
                .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
                .text(d => (d.data.name == "") ? "" : d.data.name)
				.attr('fill', 'white');
				
			text.append('textPath')
                .attr('startOffset','50%')
                .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
                .text(d => (d.data.name == "") ? formatNumber(d.value) + ' tags' : "")
				.attr('fill', '#666');

				
			d3.select("#container").on("mouseleave", mouseleave);
            
			
				function showtooltip(d) {
					if(d.parent){
					  const total = d.parent.value;
					  const percent = Math.round(1000 * d.value / total) / 10;
					  const sp_lbl = (!d.parent || d.parent.data.name == "") ? formatNumber(d.value) + ' ' + d.data.name +' tags released' : '';
					  const rel_lbl = (!d.parent.parent || d.parent.parent.data.name == "") ? formatNumber(d.value) + ' ' + d.parent.data.name +' tags released by ' +d.data.name : '';
					  const rel_perlbl = (!d.parent.parent || d.parent.parent.data.name == "") ? '(' + percent + '% of ' + d.parent.data.name + ' tags)' : '';
					  const recap_lbl = (d.parent.parent && d.parent.parent.data.name != "") & (d.data.name != "not recaptured") ?
						formatNumber(d.value) +' '+ d.parent.parent.data.name +' tags released by ' +d.parent.data.name+' were recaptured by '+d.data.name: '';
					  const recap_perlbl = (d.parent.parent && d.parent.parent.data.name != "") ? '(' + percent + '% of ' + d.parent.parent.data.name + ' tags released by ' + d.parent.data.name + ')' : '';
					  const norecap_lbl = (d.data.name == "not recaptured") ? formatNumber(d.value) +' ' + d.parent.parent.data.name + ' tags released by ' + d.parent.data.name + ' were not recaptured' : '';
					  tooltip.select('.sp').html(sp_lbl);         
					  tooltip.select('.rel').html(rel_lbl);
					  tooltip.select('.recap').html(recap_lbl);
					  tooltip.select('.norecap').html(norecap_lbl);
					  tooltip.select('.percent').html(rel_perlbl);
					  tooltip.select('.percentrecap').html(recap_perlbl); 					  
					  tooltip.style('display', 'block'); // set display  
				  }
					}				
					
				function fademouseover(d) {

					  //var sum = 187135;
					  var sum = root.value
					  var number = formatNumber(d.value);
					  var percentage = (100 * d.value / sum).toPrecision(3);
					  var percentageString = percentage + "%";
					  if (percentage < 0.1) {
						percentageString = "< 0.1%";
					  }

					  var sequenceArray =  d.ancestors().reverse();
					  sequenceArray.shift(); // remove root node from the array
					  updateBreadcrumbs(sequenceArray, percentageString, number);

					  // Fade all the segments.
					  d3.selectAll("path")
						  .style("opacity", 0.45);

					  // Then highlight only those that are an ancestor of the current segment.
					  svg.selectAll("path")
						  .filter(function(node) {
									return (sequenceArray.indexOf(node) >= 0);
								  })
						  .style("opacity", 1);
					}
					
					
					function mouseleave(event,d) {
						  // Hide the breadcrumb trail
						  d3.select("#trail")
							  .style("visibility", "hidden");
						  d3.select("#traila")
							  .style("visibility", "hidden");

						  // Deactivate all segments during transition.
						  d3.selectAll("path").on("mouseover", null);

						  // Transition each segment to full opacity and then reactivate it.
						  d3.selectAll("path")
							  .transition()
							  .duration(1000)
							  .style("opacity", 1)
							  .on("end", function() {
									  d3.select(this).on("mouseover", (event, d) => fademouseover(d));
									});

						 // d3.select("#explanation")
							//  .style("visibility", "hidden");
						}
						
						
					function initializeBreadcrumbTrail() {
					  // Add the svg area.
					  var trail = d3.select("#sequence").append("svg:svg")
                          .style('width', width)
                          .style('height', bcboxheight)
                          .attr('viewBox', `0 0 ${width} ${bcheight}`)
						  //.attr("width", '100vw')
						  //.attr("height", '95vh')
                          ////.attr("height", '90vh')
                          //.attr('viewBox', `0 ${height / 2} ${width} 30`)
                          ////.attr('viewBox', `0 ${-height * 0.01} ${width} ${height}`)
						  .attr("id", "trail");
					  // Add the label at the end, for the percentage.
					  trail.append("svg:text")
						.attr("id", "endlabel")
						.style("fill", "#666")
						.style('text-align', 'left');
					  					  // Add the svg area.
					  var traila = d3.select("#sequenceb").append("svg:svg")
                          .style('width', width)
                          .style('height', bcboxheight)
                          .attr('viewBox', `0 0 ${width} ${bcheight}`)
						  //.attr("width", '100vw')
						  //.attr("height", '5vh')
                          ////.attr("height", '90vh')
                          //.attr('viewBox', `0 0 ${width} 30`)
						  .attr("id", "traila");
					  traila.append("svg:text")
						.attr("id", "endlabela")
						.style("fill", "#666")
						.style('text-align', 'left');
					}
					
					function breadcrumbPoints(event,d, i) {
					  var points = [];
					  points.push("0,0");
					  points.push(b.w + ",0");
					  points.push(b.w + b.t + "," + (b.h / 2));
					  points.push(b.w + "," + b.h);
					  points.push("0," + b.h);
					  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
						points.push(b.t + "," + (b.h / 2));
					  }
					  return points.join(" ");
					}
					
					
					function updateBreadcrumbs(nodeArray, percentageString, number) {
					  // Data join; key function combines name and depth (= position in sequence).
					  var trail = d3.select("#trail")
						  .selectAll("g")
						  .data(nodeArray, function( d) { return d.data.name + d.depth; });
					  var traila = d3.select("#traila")
						  .selectAll("g")
						  .data(nodeArray, function(d) { return d.data.name + d.depth; });

					  // Remove exiting nodes.
					  trail.exit().remove();
					  traila.exit().remove();

					  // Add breadcrumb and label for entering nodes.
					  var entering = trail.enter().append("svg:g");
					  var enteringa = traila.enter().append("svg:g");

					  entering.append("svg:polygon")
						  .attr("points", breadcrumbPoints)
						  .style("fill", color);
						  
					  enteringa.append("svg:polygon")
						  .attr("points", breadcrumbPoints)
						  .style("fill", color);

					  entering.append("svg:text")
						  .attr("x", (b.w + b.t) / 2)
						  .attr("y", b.h / 2)
						  .attr("dy", "0.35em")
						  .attr("text-anchor", "middle")
						  .style("fill", "#fff")
						  .text(function(d) { return d.data.name; });
						  
					  enteringa.append("svg:text")
						  .attr("x", (b.w + b.t) / 2)
						  .attr("y", b.h / 2)
						  .attr("dy", "0.35em")
						  .attr("text-anchor", "middle")
						  .style("fill", "#fff")
						  .text(function(d) { return (d.parent.data.name == "") ? 'species:' : (d.parent.parent.data.name == "") ? 'tagged by:' : 'recaptured by:'; });
						  
					  // Merge enter and update selections; set position for all nodes.
					  entering.merge(trail).attr("transform", function(d, i) {
						return "translate(" + i * (b.w + b.s) + ", 0)";
					  });
					  
					  enteringa.merge(traila).attr("transform", function(d, i) {
						return "translate(" + i * (b.w + b.s) + ", 0)";
					  });

					  // Now move and update the percentage at the end.
					  d3.select("#trail").select("#endlabel")
						  .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
						  .attr("y", b.h / 2)
						  .attr("dy", "0.35em")
						  .attr("text-anchor", "middle")
						  .text(percentageString);
						  
					  d3.select("#traila").select("#endlabela")
						  .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
						  .attr("y", b.h / 2)
						  .attr("dy", "0.35em")
						  .attr("text-anchor", "middle")
						  .text(number+' tags');

					  // Make the breadcrumb trail visible, if it's hidden.
					  d3.select("#trail")
						  .style("visibility", "");
					  d3.select("#traila")
						  .style("visibility", "");

					}
					
						var b = {
							w: 225, h: bcheight, s: 5, t: 25
							};

        function focusOn(event,d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
            // Reset to top-level if no data point specified

            const transition = svg.transition()
                .duration(750)
                .tween('scale', () => {
                    const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                        yd = d3.interpolate(y.domain(), [d.y0, 1]);
                    return t => { x.domain(xd(t)); y.domain(yd(t)); };
                });

            transition.selectAll('path.main-arc')
                .attrTween('d', d => () => arc(d));

            transition.selectAll('path.hidden-arc')
                .attrTween('d', d => () => middleArcLine(d));

            transition.selectAll('text')
                .attrTween('display', d => () => textFits(d) ? null : 'none');

            moveStackToFront(d);

            //

            function moveStackToFront(elD) {
                svg.selectAll('.slice').filter(d => d === elD)
                    .each(function(d) {
                        this.parentNode.appendChild(this);
                        if (d.parent) { moveStackToFront(d.parent); }
                    })
            }
        }	
	

	}
  render() {
    return (<div >    
				<div id="main">
				  <div id="sequenceb"></div>
				  <div id="sequence"></div>
				  <div id="graph">
					
					<svg ref={node => this.node = node} >
                      </svg>
				  </div>
				</div>
			<div id="tooltip"></div></div>
			)
  }
}

export default SunburstPlot
