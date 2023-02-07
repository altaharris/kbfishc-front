import React, { useEffect } from 'react'
import * as d3 from 'd3'

import '../d3/d3.css'

const data={
  name: 'USGS',
  children: [
    {
      name: 'Fieldwork',
      children:[{name:'Projects'
		         , children:[{
					 name:"Adult Monitoring",
					 size:10
					 
					 },
					 {
					   name:"Juvenile Habitat",
					   size:5
					  },
					 {
					   name:"Adult Telemetry",
					   size:5
					  }]
				},
				{
				  name:"Requirements",
				  children:[
				   {
				   name:"Operate Boat",
				   size:2
				   },{
				   name:"Fish Traps",
				   size:3
				   },{
				   name:"Observe and Record Fish Health Data",
				   size:3
				   },{
				   name:"PIT tag",
				   size:5
				   },
				  ]
				  }
			   ]
     }, {
      name:"Data Projects", 
      children:[{name:'Projects'
		         , children:[{name:"Klamath Falls Field Station Data Projects",
					 children:[
					 {
					 name:"Adult Monitoring",
					 size:20
					 },
					 {
					   name:"Juvenile Habitat",
					 size:15
					  },
					 {
					   name:"Adult Telemetry",
					 size:10
					  },
					 {
					   name:"Juvenile Mesocosm",
					 size:10
					  }]
				    }, {
						name:"Klamath River Basin PIT Tagging Database",
					     size:20
						},
						{name:"Asian Carp Telemetry Visualization",
					     size:10
						 },
						{name:"Brackish Water Inventory",
					      size:10
						  },
						{
						  name:"Wildlife Health Information Sharing Partnership",
					      size:10
						 }
					  ]
				},
				{
				  name:"Requirements",
				  children:[
				   {
				   name:"SQL databases - SQL Server and Postgresql",
					      size:30
				   },{
				   name:"R Statistical Language",
					      size:10
				   },{
				   name:"Python",
					      size:20
				   },{
				   name:"Javascript - React.js, Node.js, d3.js",
					      size:20
				   },{
				   name:"Java (Spring framework)",
					      size:10
				   },{
				   name:"php",
					      size:10
				   },{
				   name:"Desktop Applications VB.net and C#",
					      size:10
				   },
				  ]
				  }
			   ]
     }
    ]
  }
function SplitTitle(s){
    var rslt=[];
    var str=s.split(" ");
    if (str.length<5){
		rslt.push(str.slice(0,2).join(" "));
		if(str.length>2){
			rslt.push(str.slice(2).join(" "));
			}
		}
	else if (str.length <12){		
		rslt.push(str.slice(0,2).join(" "));
		if(str.length>2){
			rslt.push(str.slice(2,4).join(" "));
			}
		if(str.length>4){
			rslt.push(str.slice(4, 8).join(" "));
			}
		if(str.length>8){
			rslt.push(str.slice(8).join(" "));
			}
		}
	else{		
		rslt.push(str.slice(0,4).join(" "));
		if(str.length>4){
			rslt.push(str.slice(4,8).join(" "));
			}
		if(str.length>8){
			rslt.push(str.slice(8,12).join(" "));
			}
		if(str.length>12){
			rslt.push(str.slice(12).join(" "));
			}
		}
		
		
	return rslt
	}
function Pack(data, width , height){
  
  const pack = data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.size)
    .sort((a, b) => b.size - a.size))
  const color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(180,11%,59%)", "hsl(235,60%,50%)"])
    .interpolate(d3.interpolateHcl)
  const root = pack(data);
  let focus = root;
  let view;

  const svg = d3.select("#treeWrapper").append("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", (event) => zoom(event, root));

  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "#e7ecf7")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  const label = svg.append("g")
      .classed("exp-vis-div", true)
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")    
      .classed("exp-vis-text", true)
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      
 label.selectAll("tspan")
      .data(d =>SplitTitle(d.data.name).map((dd, i) => ({name:dd, x:d.x, y:d.y, idx:i, r:d.r})))
      .join("tspan")
      .attr("x", d => (-.3*d.r))
      .attr("y", d => d.idx * 20)
      .text(d=> d.name);

  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 3.5]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

}
 function Experience(props) {
  const width=props.width;
  const height = props.height;
  
  useEffect(() => {
	    const width=props.width;
        const height = props.height;
		
        Pack(data, width *.8, height*.8)
	    
	},[]);
	
  return (
    <div id="treeWrapper" style={{ width: width, height: height, fontSize:"70%" }}>
      {/*<Tree
        data={data}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        depthFactor="300"
        initialDepth="2"
        translate={{x:width/10, y:height/2}}
      />
       */}

    </div>
    
  );
}

export default Experience
