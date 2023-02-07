import React, { Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import ScaleLoader from "react-spinners/ScaleLoader";


class AgencyHome extends Component{
  constructor(props){
	super(props);
}
render(){

   
      return (

        
        <div style={{"gridColumn":"2", "gridRow":"1/6", "textAlign":"left", "paddingLeft":"2em",  "fontSize":"45%"}}>     
          <header className={"App-bar-slim"}>   
	         <nav class="main-nav">
	          <a>Home</a>
	          <a>Summary Data</a>
	          <a>My Fish Summaries</a>
	          <a>Remote Time Series</a>
	          <a>Browse My Data</a>
	         </nav>
            </header>
	       
	       <header className={"App-bar-slim"}>   
	         <nav class="main-nav">
	          <a>Explore Maps</a>
	          <a>Submit Data</a>
	          <a>Tag Lookup</a>
	          <a>Build Query</a>
	          <a >Logout</a>
	      
	         </nav>
            </header>
        </div>
        
    );
  
}

}

export default AgencyHome
