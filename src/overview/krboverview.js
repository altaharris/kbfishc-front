import React, { Component } from 'react'

import Collaboration from './Collaboration.js'
import Development from './Development.js'
import Opening from './Opening.js'
import Usage from './Usage.js'
import Pipeline from './Pipeline.js'
import ProjectFuture from './ProjectFuture.js'

import Header from './../components/header.js';
import Footer from './../components/footer.js';


const id_tbet='sd-tbet';
const id_tba='sd-tba';
const id_tbhm='sd-hm';
const id_tbsb='sd-sb';
const id_tbpl='sd-pl';


function GetVisPanel(selectedTab, width, height, data){

    const adim=Math.min(400,width) 
	
	if(selectedTab===id_tbet){
			return <Collaboration width={ width } height={ height }/>
		}else if(selectedTab===id_tba){
			return <Development width={ width } height={ height }/>
		}else if(selectedTab===id_tbhm){
			return <Usage width={ width } height={ height }/>
		}else if(selectedTab===id_tbsb){
			return <ProjectFuture width={ width } height={ height }/>
		}else if(selectedTab===id_tbpl){
			return <Pipeline width={ width } height={ height }/>
		}else{
			return <Opening width={ width } height={ height }/>
			}
	}
class KRBoverview extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width,
			agency:this.props.agency,
			selectedTab:this.props.selectedTab,
			}
		this.tabClicked = this.tabClicked.bind(this);
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
    
    }
    

	render(){


	const seltab=this.state.selectedTab;
	const width=this.props.width;
	const height = this.props.height;


		return(
		 <div>    
		
		  <header className="App-bar">
			<p style={{color:'white', fontSize:"4em", paddingTop:"3vmin", marginTop:0, width:width, height:"6em"}}>
			  Klamath River Basin PIT Tagging Database
			</p>
		  </header>
		  <div className="App-header">      
			<div style={{"display":"grid", "gridTemplateRows":"3em auto", "gridTemplateColumns":"90vw"}}>
			   <div style={{"gridRow":"1", "display":"grid", "gridTemplateColumns":"1fr 4fr","rowGap":".5em"}}>
				  <div style={{"gridRow":"3", "gridColumn":"1"}}>
							<button className="nav2-button" onClick={(e) => this.tabClicked(id_tbet, e)} id={ id_tbet} style={{"borderRight":"none", 
																							  "backgroundColor":seltab===id_tbet?"#80ced6":null, 
																							  "color":seltab===id_tbet?"#fff":null}}>
								Collaboration
							</button>
				  </div>
				   <div style={{"gridRow":"1", "gridColumn":"1"}}>
							<button className="nav2-button" onClick={(e) => this.tabClicked(id_tba, e)} id={ id_tba} style={{"borderRight":"none", 
																							  "backgroundColor":seltab===id_tba?"#80ced6":null, 
																							  "color":seltab===id_tba?"#fff":null}}>
								Database Development
							</button>
				  </div>
				   <div style={{"gridRow":"2", "gridColumn":"1"}}>
							<button className="nav2-button" onClick={(e) => this.tabClicked(id_tbhm, e)} id={ id_tbhm} style={{"borderRight":"none", 
																							  "backgroundColor":seltab===id_tbhm?"#80ced6":null, 
																							  "color":seltab===id_tbhm?"#fff":null}}>
								Web Interface Tool
							</button>
				  </div>
				   <div style={{"gridRow":"5", "gridColumn":"1"}}>
							<button className="nav2-button" onClick={(e) => this.tabClicked(id_tbsb, e)} id={ id_tbsb} style={{"borderRight":"none", 
																							  "backgroundColor":seltab===id_tbsb?"#80ced6":null, 
																							  "color":seltab===id_tbsb?"#fff":null}}>
								Future of the Project
							</button>
				  </div>
				   <div style={{"gridRow":"4", "gridColumn":"1"}}>
							<button className="nav2-button" onClick={(e) => this.tabClicked(id_tbpl, e)} id={ id_tbpl} style={{"borderRight":"none", 
																							  "backgroundColor":seltab===id_tbpl?"#80ced6":null, 
																							  "color":seltab===id_tbpl?"#fff":null}}>
								Data Pipeline
							</button>
				  </div>
				  { GetVisPanel(seltab, this.props.width, this.props.height) }
			   </div>
						
			 </div>
			
		   </div>  
		<Footer />
		</div>
		)
		
		}


}

export default KRBoverview
