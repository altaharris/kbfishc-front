import React, { Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import ScaleLoader from "react-spinners/ScaleLoader";


class AdminHome extends Component{
  constructor(props){
	super(props);
}
render(){

   
      return (

        
        <div style={{"gridColumn":"2", "gridRow":"1/6", "textAlign":"left", "paddingLeft":"2em",  "fontSize":"45%"}}>     
             <header className={"App-bar-slim"}>   
	         <nav class="main-nav">
	          <a>Home</a>
	          <a>Review Data</a>
	          <a>Recent Data Submissions</a>
	          <a>Remote Outages</a>
	          <a>Browse Data By Agency</a>
	         </nav>
            </header>
	       
	       <header className={"App-bar-slim"}>   
	         <nav class="main-nav">
	          <a>Edit Data</a>
	          <a>Explore Maps</a>
	          <a>Agency Lookup</a>
	          <a>Build Query</a>
	          <a>Logout</a>
	      
	         </nav>
            </header>
        </div>
        
    );
  
}

}

export default AdminHome
