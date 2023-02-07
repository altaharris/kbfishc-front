import React,  { useEffect, useState }  from 'react'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';
function BasinMap(props) {
  

  const width = props.width*.9
  const height = props.height*.6
    useEffect(() => {
	
        createHeatmapChart()
	   
	},[]);
	
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
            
        }
 


    return (  
               <div class="folium-map" id="krb_heat_map" style={{"width": width,  "height": height }}>
               
               </div>
            
			)

}

export default BasinMap
