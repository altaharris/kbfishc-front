import React, { Component } from 'react'
import Heatmap from './Heatmap.js'
import Sunburst from './Sunburst.js'
import TagsByEncT from './TagsByEncT.js'
import TagsByAgency from './TagsByAgency.js'
import EncHist from './EncHist.js'


function GetVisPanel(selectedTab, width, height){
	const id_tbet='sd-tbet';
	const id_tba='sd-tba';
	const id_tbhm='sd-hm';
	const id_tbsb='sd-sb';
	const id_tbeh='sd-eh';
	
	if(selectedTab===id_tbet){
			return <TagsByEncT width={ width } height={ height }/>
		}else if(selectedTab===id_tba){
			return <TagsByAgency />
		}else if(selectedTab===id_tbhm){
			return <Heatmap  width={ width } height={ height }/>
		}else if(selectedTab===id_tbsb){
			return <Sunburst width={ width } height={ height }/>
		}else if(selectedTab===id_tbeh){
			return <EncHist width={ width } height={ height }/>
		}else{
			return <div>No Match</div>
		}
	}
class SummaryData extends Component{
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
	const id_tbet='sd-tbet';
	const id_tba='sd-tba';
	const id_tbhm='sd-hm';
	const id_tbsb='sd-sb';
	const id_tbeh='sd-eh';
		
	
	return(
        <div style={{"display":"grid", "gridTemplateRows":"2em auto", "gridTemplateColumns":"90vw"}}>
           <div style={{"gridRow":"1", "display":"grid", "gridTemplateColumns":"auto auto auto auto auto auto"}}>
              <div style={{"gridRow":"1", "gridColumn":"2"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tbet, e)} id={ id_tbet} style={{"borderRight":"none", 
							                                                              "backgroundColor":this.state.selectedTab===id_tbet?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tbet?"#fff":null}}>
					        Tags By Encounter Type
				        </button>
			  </div>
              <div style={{"gridRow":"1", "gridColumn":"3"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tba, e)} id={ id_tba} style={{"borderRight":"none",
							                                                              "backgroundColor":this.state.selectedTab===id_tba?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tba?"#fff":null}}>
					        Tags By Agency
				        </button>
			  </div>
              <div style={{"gridRow":"1", "gridColumn":"4"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tbhm, e)} id={ id_tbhm} style={{"borderRight":"none", 
							                                                              "backgroundColor":this.state.selectedTab===id_tbhm?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tbhm?"#fff":null}}>
					        Heatmap
				        </button>
			  </div>
              <div style={{"gridRow":"1", "gridColumn":"5"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tbsb, e)} id={ id_tbsb} style={{
							                                                              "backgroundColor":this.state.selectedTab===id_tbsb?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tbsb?"#fff":null}}>
					        Sunburst
				        </button>
			  </div>
			  
              <div style={{"gridRow":"1", "gridColumn":"6"}}>
                        <button className="nav2-button" onClick={(e) => this.tabClicked(id_tbeh, e)} id={ id_tbeh} style={{
							                                                              "backgroundColor":this.state.selectedTab===id_tbeh?"#80ced6":null, 
							                                                              "color":this.state.selectedTab===id_tbeh?"#fff":null}}>
					        Encounter History
				        </button>
			  </div>
           </div>
           
           { GetVisPanel(this.state.selectedTab, this.props.width, this.props.height) }
           
        </div>
        
        
	)
	
	}
}

export default SummaryData
