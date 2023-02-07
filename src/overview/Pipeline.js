import React, { Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

import pitdlpic from './img/PITdl.png';
import dlhome from './img/KFFSDatalinkHome.png';
import dladult from './img/Adultprocess.png';
import surveymap from './img/SurveyMap.jpg';
import surveyss from './img/SurveyScreenshot.jpg';
import surveysumm from './img/SurveySummary.jpg';
import odksurveyss from './img/odksurveyss.png';
function GetVisPanel(selectedTab, width, height, clicks, imgClick){

    const adim=Math.min(400,width) 
	
	if(selectedTab===1){
			return (
				<React.Fragment>
				<div style={{"gridColumn":"2", "gridRow":"1/2", "textAlign":"left", "paddingLeft":"2em"}}>
				<ul>
				   <li>Remote Files</li>
				   <li style={{"paddingTop":"1em"}}>Tagging Data</li>
				   <li style={{"paddingTop":"1em"}}>Site Information</li>
				   <li style={{"paddingTop":"1em"}}>Remote Outage Information</li>
				   <li style={{"paddingTop":"1em"}}>Associated Metadata</li>

				</ul>
				</div>
				 </React.Fragment>
				 )
		}else if(selectedTab===2){
			return <div  style={{"gridColumn":"1/3", "gridRow":"1", "textAlign":"left", "paddingLeft":"2em"}}> 
			       
			       <h3>File Transfer Package</h3>
			       <ul>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faCircleQuestion} /> A uniform file package transferred to the server</li>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faCircleQuestion} /> Machine readable file describing information</li>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faScrewdriverWrench} /> Produced by the Web Interface Tool</li>
			       </ul>
			       </div>
		}else if(selectedTab===3){
			return <div  style={{"gridColumn":"1/3", "gridRow":"1", "textAlign":"left", "paddingLeft":"2em"}}> 
			       <h3>Tagging Data</h3>
			       <ul>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faScrewdriverWrench} /> Agency specific scripts in SQL and Python</li>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faCircleQuestion} /> Electronic data collection</li>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faCircleQuestion} /> Machine readable bridge</li>
			       </ul>
			       </div>
		}else if(selectedTab===4){
			return <div  style={{"gridColumn":"1/3", "gridRow":"1", "textAlign":"left", "paddingLeft":"2em"}}> 
			       
			       <h3>Administrator Interface</h3>
			       <ul>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faClock} /> Backlogged data</li>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faGamepad} /> Prototyping</li>
			       <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faScrewdriverWrench} /> Admin and Agency Home pages</li>
			       </ul>
			       </div>
		}else if(selectedTab===6){
			return (
			     <div style={{"gridColumn":"1/2", "gridRow":"1/2"}}>
			        <h3>USGS Application</h3>
			        <img onClick={(e) => imgClick(e)} src={ clicks===1?pitdlpic:clicks==2?dlhome:clicks==3?dladult:null } style={{ "width":"80%", "height":"auto" }} />
			     </div>
			       )
		}else if(selectedTab===7){
			return( 
			     <div style={{"gridColumn":"1/2", "gridRow":"1/2"}}>
			     <h3>ESRI Survey 123</h3>
			        <img onClick={(e) => imgClick(e)} src={ clicks===1?surveyss:clicks==2?surveysumm:clicks==3?surveymap:null } style={{ "width":"auto", "height":"400px" }} />
			     </div>
			     )
		}else if(selectedTab===8){
			return (<div style={{"gridColumn":"1/2", "gridRow":"1/2"}}>
			      <h3>Open Data Kit</h3>
			      <img onClick={(e) => imgClick(e)} src={ odksurveyss } style={{ "width":"auto", "height":"400px" }} />
			</div>)
		}
	}
function divmMenuItem(id, padRight, seltab, tabClicked){
	if(padRight){
		return (<a href="#" style={{ "color":"#182635" , "textDecoration":"none"}} onClick={(e) => tabClicked(id, e)}>
		   <div style={{"paddingLeft":".3em","paddingRight":"2em", "backgroundColor":seltab===id?"#8ca3a3":null}}>{ id }</div>
		    </a>);
		}
		return (<a href="#" style={{ "color":"#182635" , "textDecoration":"none"}} onClick={(e) => tabClicked(id, e)}>
		   <div style={{"paddingLeft":".3em", "backgroundColor":seltab===id?"#8ca3a3":null}}>{ id }</div>
		    </a>);
	}
class Pipeline extends Component{
  constructor(props){
	super(props);
		this.state={
			selectedTab:1,
			imgclick:1
			}
		this.tabClicked = this.tabClicked.bind(this);		
		this.imgClicked = this.imgClicked.bind(this);
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
        this.setState({imgclick:1})
    }
	imgClicked(e) {
		const clickcount= this.state.imgclick
        this.setState({imgclick:clickcount<3?clickcount+1:1});
    
    }
render(){

    const width=this.props.width;
    const height = this.props.height;
    const seltab= this.state.selectedTab;
    const clickcount= this.state.imgclick
      return (

        <React.Fragment>
        <div style={{"gridColumn":"2", "gridRow":"1/6"}}>     
           { GetVisPanel(seltab, this.props.width, this.props.height,clickcount, this.imgClicked) }
        </div>
        <div style={{"gridColumn":"2", "gridRow":"7", "display":"flex", "flexDirection":"row-reverse"}}>
        	
			{ divmMenuItem(4, true, seltab, this.tabClicked) }
			{ divmMenuItem(3, true, seltab, this.tabClicked) }
			{ divmMenuItem(2, true, seltab, this.tabClicked) }
			{ divmMenuItem(1, true, seltab, this.tabClicked) }
        </div>
        </React.Fragment>
    );
  

}

}

export default Pipeline
