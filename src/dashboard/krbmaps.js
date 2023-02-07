import React, { Component } from 'react'
import YTOCSites from './../d3/YTOCSites.js'
import SamplingSites from './../d3/SamplingSites.js'
import SamplingArea from './../d3/SamplingArea.js'

function GetVisPanel(selectedTab, width, height){
	const id_tbet='sd-tbet'
	const id_tba='sd-tba'
	const id_tbhm='sd-sa'
	const id_tbsb='sd-sb'
	
	if(selectedTab===id_tbet){
			return <YTOCSites width={ width } height={ height }/>
		}else if(selectedTab===id_tba){
			return <SamplingSites width={ width } height={ height }/>
		}else if(selectedTab===id_tbhm){
			return <SamplingArea width={ width } height={ height }/>
		}
	}
class KRBmaps extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width,
			agency:this.props.agency,
			selectedTab:this.props.selectedTab
			}
		this.tabClicked = this.tabClicked.bind(this);
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
    
    }
	render(){
	const id_tbet='sd-tbet'
	const id_tba='sd-tba'
	const id_tbhm='sd-sa'
	const id_tbsb='sd-sb'
		
	
	return(
        <div style={{"display":"grid", "gridTemplateRows":"2em auto", "gridTemplateColumns":"90vw"}}>
           <div style={{"gridRow":"1", "display":"grid", "gridTemplateColumns":"auto auto auto auto auto auto"}}>
              <div style={{"gridRow":"1", "gridColumn":"2"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tbet, e)} id={ id_tbet} style={{"borderRight":"none", 
							                                                              "backgroundColor":this.state.selectedTab===id_tbet?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tbet?"#fff":null}}>
					        Klamath PIT Tag Detection Arrays
				        </button>
			  </div>
			   <div style={{"gridRow":"1", "gridColumn":"3"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tba, e)} id={ id_tba} style={{"borderRight":"none", 
							                                                              "backgroundColor":this.state.selectedTab===id_tba?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tba?"#fff":null}}>
					        Klamath Sampling Sites
				        </button>
			  </div><div style={{"gridRow":"1", "gridColumn":"4"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tbhm, e)} id={ id_tbhm} style={{"borderRight":"none", 
							                                                              "backgroundColor":this.state.selectedTab===id_tbhm?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tbhm?"#fff":null}}>
					        Klamath Sampling Area
				        </button>
			  </div>
           </div>
           
           { GetVisPanel(this.state.selectedTab, this.props.width, this.props.height) }
           
        </div>
        
        
	)
	
	}
}

export default KRBmaps
