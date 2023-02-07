import React, { useEffect, useState } from 'react'

import ScaleLoader from "react-spinners/ScaleLoader";
import HeatmapPlot from "./../d3/Heatmap.js"
function Heatmap(props){
	
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); 
  const [lastTimeStamp, setLastTimeStamp] = useState(null);
  const [dataReady, setDataReady] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const timestamp= props.timestamp
  

  
  useEffect(() => {
    if(symbol!==null && symbol!==props.symbol){
        props.onSymbolChange(symbol);
	}
	},[symbol]);
	
  useEffect(() => {
      let isComponentMounted = true;
      const fetchData = async () => {
		   setIsLoaded(false)
           const response = await fetch('http://rover-n:3000/heatmap');
           const newData = await response.json();
             if(isComponentMounted) {
                 setData(newData);
                 setIsLoaded(true)
                 setDataReady(new Date())
            }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    }
  },[props.timestamp]);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div><ScaleLoader color="#50394c"/></div>;
  }
  else {
    const width=props.width
    const height = props.height


      return (

      
        <div style={{"gridColumn":"1", "gridRow":"2"}}>     
           <HeatmapPlot data = { data } width={width} height={height}/>
        </div>
        
    );
  }



}

export default Heatmap
