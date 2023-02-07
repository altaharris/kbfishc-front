import React, { Component} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import ScaleLoader from "react-spinners/ScaleLoader";


class Collaboration extends Component{
  constructor(props){
	super(props);
		this.state={
			selectedTab:1,
			roadmapclicked:false,
			}
		this.tabClicked = this.tabClicked.bind(this);
		
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
    
    }
render(){

    const width=this.props.width;
    const height = this.props.height;
    const seltab= this.state.selectedTab;
    const rmclicked=this.state.roadmapclicked;
    if (!rmclicked){
      return (

        <React.Fragment>
        <div style={{"gridColumn":"2", "gridRow":"1/6", "textAlign":"left", "paddingLeft":"2em"}}>     
           <ul>
           <li>Data Sharing Agreement</li>
           <li style={{"paddingTop":"1em"}}>Klamath Basin Fisheries Collaborative Spring Meeting</li>
           <li style={{"paddingTop":"1em"}}><a style={{ "color":"#182635" , "textDecoration":"none"}} onClick={ () => this.setState({roadmapclicked:true}) }>Project Roadmap</a></li>
           <li style={{"paddingTop":"1em"}}>Electronic Data Entry</li>
           <li style={{"paddingTop":"1em"}}>Capture Remote Site and Outage Information</li>
           <li style={{"paddingTop":"1em"}}>Array Site Selection</li>
           </ul>
        </div>
        </React.Fragment>
    );
  }else{
	  return(
	      <div style={{"gridColumn":"2", "gridRow":"1/6", "textAlign":"left", "paddingLeft":"2em", "display":"grid", "gridAutoRows":"minmax(.5em, 1fr)"}}>
	      <FontAwesomeIcon style={{"gridColumn":"1", "gridRow":"1", "textAlign":"right", "transform": "rotate(-90deg)" }} icon={faArrowUpRightFromSquare} onClick={ () => this.setState({roadmapclicked:false}) }/>
	      
	      <span style = {{"gridColumn":"1", "gridRow":"3/6"}} > <FontAwesomeIcon icon={faStar} />Database</span>
	      <span style = {{"gridColumn":"1", "gridRow":"8/9"}} > Access tools</span>
	      
	      <span style = {{"gridColumn":"2", "gridRow":"3"}} > Backlog</span>
	      <span style = {{"gridColumn":"2", "gridRow":"4"}} > Metadata</span>
	      <span style = {{"gridColumn":"2", "gridRow":"5"}} > Tagging Data</span>
	      <span style = {{"gridColumn":"2", "gridRow":"6"}} > Remote Files</span>
	      <span style = {{"gridColumn":"2", "gridRow":"8"}} > Administrator tools</span>
	      <span style = {{"gridColumn":"2", "gridRow":"9"}} > User Interface</span>
	      </div>
	  );
	  }

}

}

export default Collaboration
