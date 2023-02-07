import React,  { useEffect, useState }  from 'react'
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';
import "leaflet.heat";
import "leaflet.markercluster";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
library.add(faLocationArrow)

         
function SamplingSites(props) {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [ytocSitemap, setYtocSmap] = useState(null);
  const width = props.width*.9
  const height = props.height*.7
    useEffect(() => {
        createSitemapChart()
	    setIsLoaded(true);
	},[]);
    useEffect(() => {
		if (isLoaded){
		  const data=props.data;
          siteMapData( ytocSitemap);
	    }
	},[ytocSitemap]);
	
	
  function createSitemapChart() {
            const ytoc_site_map = L.map(
                "ytoc_site_map",
                {
                    center: [42.0, -122.619],
                    crs: L.CRS.EPSG3857,
                    zoom: 8,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );
            L.control.scale().addTo(ytoc_site_map);
             
             const tile_layer_kytoc_site_map = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(ytoc_site_map);
            setYtocSmap(ytoc_site_map)
        }
  function siteMapData(map){
      
            const siteloc=[
            {"group": "Longterm monitoring sites", "sites":[
				{"name":"Salt Creek", "coords":[41.555064,-124.062636]},
				{"name":"Panther Creek", "coords":[41.554073,-124.056436]},
				{"name":"Waukell Creek", "coords":[41.512987,-124.035104]},
				{"name":"McGarvey Creek", "coords":[41.499969,-123.997912]},
				{"name":"Sandy Bar Floodplain", "coords":[41.309732,-123.526362]}], "color":"#01665e"},
			{"group":"Recently added monitoring sites", "sites":[
				{"name":"Seiad Creek", "coords":[41.843791,-123.206922]},
				{"name":"Horse Creek", "coords":[41.842963,-123.02706]},
				{"name":"Scott River", "coords":[41.63645,-123.067483]},
				{"name":"Shasta River", "coords":[41.401701,-122.867646]}], "color":"#35978f"},
			{"group":"Potential sites", "sites":[
				{"name":"French Creek", "coords":[41.402203,-122.867859]},
				{"name":"Sugar Creek", "coords":[41.342347,-122.823947]},
				{"name":"Shackleford Creek", "coords":[41.597589,-122.961798]}], "color":"#bf812d"},
			{"group":"Upper basin long term monitoring sites", "sites":[
				{"name":"Hagelstein Pond", "coords":[42.383548, -121.812616]},
				{"name":"Sprague River Array", "coords":[42.551917, -121.847193]},
				{"name":"Cinder Springs", "coords":[42.4107, -121.834901]},
				{"name":"Sprague River Dam", "coords":[42.536125, -121.862912]},
				{"name":"Willow Creek", "coords":[41.901195, -121.04689]},
				{"name":"Crooked Creek", "coords":[42.598684, -121.94521]},
				{"name":"Ouxy Springs", "coords":[42.39888, -121.823592]},
				{"name":"Silver Springs", "coords":[42.392544, -121.819639]},
				{"name":"Sucker Springs", "coords":[42.391704, -121.819131]},
				{"name":"Williamson Weir", "coords":[42.522997, -121.903523]},
				{"name":"Link River", "coords":[42.230375, -121.799665]},
				{"name":"Link River Fish Ladder", "coords":[42.233837, -121.80219]}
				], "color":"#01665e"},
			{"group":"Potential sites with dam removal", "sites":[
				{"name":"Spencer Creek", "coords":[42.151986,-122.027915]},
				{"name":"Jenny Creek", "coords":[41.977569,-122.397607]},
				{"name":"Camp Creek", "coords":[41.975810,-122.433639]},
				{"name":"Scotch Creek", "coords":[41.974757,-122.439646]},
				{"name":"Klamath River at Iron Gate Dam", "coords":[41.934146, -122.43664]},
				{"name":"Klamath River Below Keno Dam", "coords":[42.130816, -121.947827]},
				{"name":"Keno Dam Fish Ladder", "coords":[42.134834, -121.947983]}], "color":"#8c510a"}
				];
				
      var lgroups={};
      const regex1 = RegExp('potential*', 'i');
      
      for (var s of siteloc){
		  var mv=[];
		  for (var ss of s.sites){
			  mv.push(L.marker(ss.coords, {icon:L.divIcon({
								  html:ReactDOMServer.renderToString(<FontAwesomeIcon icon='location-arrow' style={{color:s.color}}  size="lg"/>),
								  className:"marker-pin-ys",
								 
								  })}).bindPopup(ss.name));
			  }
			lgroups[s.group]=L.layerGroup(mv);
			if (!regex1.exec(s.group)){
			  map.addLayer(lgroups[s.group]);
			}
		  };
	  
	 
      L.control.layers(null,lgroups).addTo(map)
      
	  }
          
        
	
	



    return (  <div>
               <div className="folium-map" id="ytoc_site_map" style={{"width": width,  "height": height }}>
               
               </div>
               <div style={{ "display":"grid", "gridTemplateRows":"1 3 3 1", "gridTemplateColumns":"auto auto auto auto",
				    "fontSize":"80%","textAlign":"left"}}>
               <span style={{gridRow:1, gridColumn:2}}>
                  <FontAwesomeIcon icon='location-arrow' style={{color:"#01665e"}}  size="sm"/> Longterm monitoring sites
               </span>
               <span style={{gridRow:1, gridColumn:3}}>
                  <FontAwesomeIcon icon='location-arrow' style={{color:"#35978f"}}  size="sm"/> Recently added monitoring sites
               </span>
               <span style={{gridRow:2, gridColumn:2}}>
                  <FontAwesomeIcon icon='location-arrow' style={{color:"#bf812d"}}  size="sm"/> Potential sites
               </span>
               <span style={{gridRow:2, gridColumn:3}}>
                  <FontAwesomeIcon icon='location-arrow' style={{color:"#8c510a"}}  size="sm"/> Potential sites with dam removal
               </span>
			   
               </div>
               </div>
			)

}

export default SamplingSites
