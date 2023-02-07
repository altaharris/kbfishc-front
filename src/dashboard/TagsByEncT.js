import React, { useEffect, useState } from 'react'

import ScaleLoader from "react-spinners/ScaleLoader";

function TagsByEncT(props){
	
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
           const response = await fetch('http://rover-n:3000/encounter-data' );
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
    return <div style={{"gridColumn":"1", "gridRow":"3"}}><ScaleLoader color="#50394c" /></div>;
  }
  else {
    const sitesa = Object.values(data.sites.subbasin)
    const stationsa=Object.values(data.sites.krbname)
    const speciesa = Object.values(data.species.presumed_species)
    const sites = [...new Set(sitesa)]
    const stations= [...new Set(stationsa)]
    const species =  [...new Set(speciesa)]
    const subbasinList=sites.map((v,i) => 
                        <option value={v} key={'subbasin' + i}>{v}</option>
                        );
    const stationList=stations.map((v, i) => 
                        <option value={v} key={'sites' + i}>{v}</option>
                        );
    const speciesList=species.map((v, i) => 
          <option key={"species" + i} value={v}>{v}</option>
          );


      return (

      
        <div style={{"gridColumn":"1", "gridRow":"2", "display":"grid", "gridTemplateColumns":" 5vw 20vw 20vw 20vw 5vw"}}>     
           <div style={{"gridColumn":"2", "gridRow":"3", "textAlign":"left"}}>
                <label><div>Subbasin</div>
                <div>
                <select>
                  {subbasinList}
                </select></div></label>
           </div>
           <div style={{"gridColumn":"3", "gridRow":"3", "textAlign":"left"}}>
                <label><div>Waterbody</div>
                <div>
                <select>
                  {stationList}
                </select></div></label>
           </div>
           <div style={{"gridColumn":"4", "gridRow":"3", "textAlign":"left"}}>
                <label><div>Species</div>
                <div>
                <select>
                  {speciesList}
                </select></div></label>
           </div>
        </div>
        
    );
  }



}

export default TagsByEncT
