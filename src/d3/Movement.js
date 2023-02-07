import React, { Component } from 'react'
import * as d3 from 'd3'
import L from 'leaflet'

import './d3.css'

class MovementPlot extends Component {
  constructor(props){
    super(props)
    this.state={ 
		movementmap:null,
		}
    this.createMovementPlot = this.createMovementPlot.bind(this)
    this.createSitemapChart = this.createSitemapChart.bind(this)
    this.SetMap = this.SetMap.bind(this);
  }

  componentDidMount() {
	this.createSitemapChart();
  }
	SetMap(map) {
        this.setState({movementmap:map});
        this.createMovementPlot(map);
    }

 createSitemapChart() {
	 
	const width= this.props.width*.75;
	const height = this.props.height *.95;
            const movement_map = L.map(
                "movement_map",
                {
                    center: [42.5, -121.9],
                    crs: L.CRS.EPSG3857,
                    zoom: 11,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );
            L.control.scale().addTo(movement_map);
             
             const tile_layer_kytoc_site_map = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(movement_map);
            this.SetMap(movement_map);
        }
  createMovementPlot(map) {
	const width= this.props.width*.75;
	const height = this.props.height *.95;
	const node = this.node
	const data = this.props.data;
	const sites=data.children.map(s=> (s.sitename));
	const xcoord=data.children.map(s=> (s.xcoord));
	const ycoord=data.children.map(s=> (s.ycoord));
	const sitesplot=data.children.map(s=> ({sitename:s.sitename, xcoord:s.xcoord, ycoord:s.ycoord}));
	const margin={left:2, right:2, top:2, bottom:2};
	const x = d3.scaleLinear()
    .domain([d3.min(xcoord), d3.max(xcoord)])
    .range([margin.left, width - margin.right])
    
	const y = d3.scaleLinear()
    .domain([d3.min(ycoord), d3.max(ycoord)])
    .range([margin.bottom, height - margin.bottom])
    
    const color = d3.quantize(d3.interpolateHcl("#fafa6e", "#2A4858"), sites.length)
        
        

            

        sitesplot.forEach(( f, i) => (L.circleMarker([f.ycoord, f.xcoord], {radius:5, color:color[i]}).addTo(map)))
	}
  render() {
	  
	const width= this.props.width*.75;
	const height = this.props.height *.95;
	
    return ( 
               <div className="folium-map" id="movement_map" style={{"width": width,  "height": height }}>
               
               </div>
			)
  }
}

export default MovementPlot
