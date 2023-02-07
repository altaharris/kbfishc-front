import React,  { useEffect, useState }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';
import "leaflet.heat";
import "leaflet.markercluster";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapPin} from '@fortawesome/free-solid-svg-icons'
library.add(faMapPin)

function HeatmapPlot(props) {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [krbHeatmap, setKrbHeatmap] = useState(null);
  const width = props.width*.9
  const height = props.height*.7
    useEffect(() => {
		const data=props.data
        createHeatmapChart()
	    setIsLoaded(true);
	},[]);
    useEffect(() => {
		if (isLoaded){
		  const data=props.data;
          heatMapData(data, krbHeatmap);
	    }
	},[props.data, krbHeatmap]);
	
	
  function createHeatmapChart() {
	 
            const krb_heat_map = L.map(
                "krb_heat_map",
                {
                    center: [42.0, -122.619],
                    crs: L.CRS.EPSG3857,
                    zoom: 8,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );
            L.control.scale().addTo(krb_heat_map);
             
             const tile_layer_krb_heat_map = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(krb_heat_map);
            setKrbHeatmap(krb_heat_map)
        }
  function heatMapData(data, map){
      const tagsencountered = Object.values(data.tagsencountered)
      const latitude=Object.values(data.latitude)
      const longitude = Object.values(data.longitude)      
      const krbname = Object.values(data.krbname)
      const species = Object.values(data.species)
      
      const sumreducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalcontacts=tagsencountered.reduce(sumreducer)
      const heatArray=latitude.filter((v,i) => (v!==null && longitude[i]!==null)).map((v,i) => ([v,longitude[i], tagsencountered[i]/totalcontacts ]));
      
      
      const heat = L.heatLayer(heatArray,
			 {radius: 15, max:.00005}).addTo(map);
      const markers = L.markerClusterGroup();
      
      //const clustermarkers=latitude.filter((v,i,a) => (v!==null && longitude[i]!==null && a.indexOf(v)==i)).map((v,i) => (markers.addLayer(L.marker(L.latLng(v, longitude[i]),{icon:L.divIcon({
		//					  html:ReactDOMServer.renderToString(<FontAwesomeIcon icon='map-pin' style={{color:"steelblue"}}  size="2x"/>),
		//						  className:"marker-pin-ys",
		//						 
		//						  })}).bindPopup(krbname[i] + " - " + species[i] + " - " + tagsencountered[i]))));
     
      //map.addLayer(markers);
	  }
          
        
	
	



    return (  
               <div className="folium-map" id="krb_heat_map" style={{"width": width,  "height": height }}>
               
               </div>
            
			)

}

export default HeatmapPlot
