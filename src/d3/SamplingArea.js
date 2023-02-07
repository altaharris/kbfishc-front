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

         
function SamplingArea(props) {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [ytocSitemap, setYtocSmap] = useState(null);
  const width = props.width*.9;
  const height = props.height*.7;
  const timestamp= props.timestamp;
  const [dataTrib, setDataTrib] = useState([]); 
  const [dataTribReady, setDataTribReady] = useState(new Date());
  const [isTribLoaded, setTribIsLoaded] = useState(false);
  const [dataWB, setDataWB] = useState([]); 
  const [dataWBReady, setDataWBReady] = useState(new Date());
  const [isWBLoaded, setWBIsLoaded] = useState(false);
  const [dataKH, setDataKH] = useState([]); 
  const [dataKHReady, setDataKHReady] = useState(new Date());
  const [isKHLoaded, setKHIsLoaded] = useState(false);
  const [dataH12, setDataH12] = useState([]); 
  const [dataH12Ready, setDataH12Ready] = useState(new Date());
  const [isH12Loaded, setH12IsLoaded] = useState(false);
  
  useEffect(() => {
      let isComponentMounted = true;
      const fetchData = async () => {
		   setIsLoaded(false)
           const response = await fetch('/geojson/klmtht.geojson');
           const newData = await response.json();
             if(isComponentMounted) {
                 setDataTrib(newData);
                 setTribIsLoaded(true)
                 setDataTribReady(new Date())
            }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    }
  },[props.timestamp]);
  
  useEffect(() => {
      let isComponentMounted = true;
      const fetchData = async () => {
		   setIsLoaded(false)
           const response = await fetch('/geojson/KRBHUC.geojson');
           const newData = await response.json();
             if(isComponentMounted) {
                 setDataKH(newData);
                 setKHIsLoaded(true)
                 setDataKHReady(new Date())
            }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    }
  },[props.timestamp]);
  
  useEffect(() => {
      let isComponentMounted = true;
      const fetchData = async () => {
		   setIsLoaded(false)
           const response = await fetch('/geojson/KRBHUC12.geojson');
           const newData = await response.json();
             if(isComponentMounted) {
                 setDataH12(newData);
                 setH12IsLoaded(true)
                 setDataH12Ready(new Date())
            }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    }
  },[props.timestamp]);
  
  useEffect(() => {
      let isComponentMounted = true;
      const fetchData = async () => {
		   setIsLoaded(false)
           const response = await fetch('/geojson/klmthwb.geojson');
           const newData = await response.json();
             if(isComponentMounted) {
                 setDataWB(newData);
                 setWBIsLoaded(true)
                 setDataWBReady(new Date())
            }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    }
  },[props.timestamp]);
  
  
    useEffect(() => {
        createSitemapChart()
	    setIsLoaded(true);
	},[]);
    
    useEffect(() => {
		if (isLoaded && dataTribReady && dataKHReady ){
		  
          siteMapTribData( ytocSitemap, dataTrib);
	    }
	},[ytocSitemap, dataTrib]);
	
    useEffect(() => {
		if (isLoaded && dataTribReady){
		  
          siteMapKHData( ytocSitemap, dataKH);
	    }
	},[ytocSitemap, dataKH]);
	
    useEffect(() => {
		if (isLoaded && dataH12Ready && dataTribReady && dataWBReady && dataKHReady){
		  
          siteMapH12Data( ytocSitemap, dataH12);
	    }
	},[ytocSitemap, dataH12]);
	
    useEffect(() => {
		if (isLoaded && dataWBReady && dataKHReady ){
		  
          siteMapWBData( ytocSitemap, dataWB);
	    }
	},[ytocSitemap, dataWB]);
	
	
  function createSitemapChart() {
            const krb_area_map = L.map(
                "krb_area_map",
                {
                    center: [42.0, -122.619],
                    crs: L.CRS.EPSG3857,
                    zoom: 8,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );
            L.control.scale().addTo(krb_area_map);
             
             const USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
					maxZoom: 20,
					attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
				}).addTo(krb_area_map);
			const Stamen_TonerLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
					attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					subdomains: 'abcd',
					minZoom: 0,
					maxZoom: 20,
					ext: 'png', 
					style:{zIndex:50}
				}).addTo(krb_area_map);
            setYtocSmap(krb_area_map)
        }
  function siteMapTribData(map, data){
      
            const TribFeat=L.geoJSON(data, {
					style: function (feature) {
						return {color: "#3D569A", weight:1, zIndex:10};
					}
				});
				TribFeat.bindPopup(function (layer) {
					return layer.feature.properties.Name;
				})
				.addTo(map);
            
			map.on('zoomend', function () {
				const currentZoom = map.getZoom();
				if (currentZoom <8 ) {
					TribFeat.setStyle({weight: .5});
				}
				else {
					if (currentZoom<10){
					TribFeat.setStyle({weight: 1});
						}
				else{
					TribFeat.setStyle({weight: 4});
				}
				}
			});
	  }
       
  function siteMapWBData(map, data){
      
             L.geoJSON(data, {
					style: function (feature) {
						return {color: "#3D569A", weight:1, fillOpacity:.5, opacity:.5, zIndex:10};
					}
				})
				.bindPopup(function (layer) {
					return layer.feature.properties.Name;
				}).addTo(map);
				
      
	  }   
        
	
	




       
  function siteMapKHData(map, data){
      
            L.geoJSON(data, {
					style: function (feature) {
						return {color: "#DEE5C7", weight:1, fillOpacity:.2, opacity:0, zIndex:5};
					}
					
				})
				.bindPopup(function (layer) {
					return layer.feature.properties.GNIS_Name;
				}).addTo(map);
      
	  }   
        
	
	






       
  function siteMapH12Data(map, data){
      
            L.geoJSON(data, {
					style: function (feature) {
						return {color: "#963230", weight:1, fillOpacity:.95, opacity:.95, zIndex:20};
					}
				})
				.bindPopup(function (layer) {
					return layer.feature.properties.GNIS_Name;
				}).addTo(map);
	  }   
        
	
	



    return (  <div>
               <div className="folium-map" id="krb_area_map" style={{"width": width,  "height": height }}>
               
               </div>
            
               </div>
			)

}

export default SamplingArea
