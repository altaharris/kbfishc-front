import React, { Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import Sunburst from './../dashboard/Sunburst.js'
import Heatmap from "./../dashboard/Heatmap.js";
import AgencyHome from "./AgencyHome.js";
import AdminHome from "./AdminHome.js";

import editpic from './img/EditData.jpg';
import barchartpic from './img/BarChart.jpg';

function GetVisPanel(selectedTab, width, height, expclicked, expclicked_item, pagechangeclicked){

    const adim=Math.min(400,width) ;
	const linkstyle={ "color":"#182635" , "textDecoration":"none"};
	if(selectedTab===1){
			return (
				<React.Fragment>
				 
				 <div style={{"gridColumn":"1/2", "gridRow":"1/2", "marginTop":"auto", "marginBottom":"auto", "textAlign":"left", "paddingLeft":"2em"}}>
				    <ul>
				   
				      <li style={{"paddingTop":"1em"}}> <a style={linkstyle} onClick={(e) => pagechangeclicked("agency", e)}>Agency Home Page</a>
				        
				      </li>
				      <li style={{"paddingTop":"1em"}}> <a style={linkstyle} onClick={(e) => pagechangeclicked(expitmid("admin", "usr"), e)}>Administrator Home Page</a>
				        
				      </li>
				   </ul>
				   </div>
				 </React.Fragment>
				 )
		}else if(selectedTab===2){
			return <Heatmap  width={ width *.7 } height={ height * .9 }/>
			       
		}else if(selectedTab===3){
			return <Sunburst width={ width *.7 } height={ height *.8}/>
		}else if(selectedTab==4){
			return <div style={{"gridColumn":"1/2", "gridRow":"1/2"}}><img src={ editpic } style={{ "width":width*.7, "height":"auto" }} /></div>
		}else if(selectedTab=5){
			return <div style={{"gridColumn":"1/2", "gridRow":"1/2"}}><img src={ barchartpic } style={{ "width":width*.7, "height":"auto" }} /></div>
			}
	}
function expitmstyle(id, expclicked, expclicked_item){
	return {"display":expclicked_item===expitmid(id, "usr")?"block":"none", "border":"solid 1px", "maxWidth":"60%", "padding":"1em"}
	}
function expitmid(id, sec){
	return "itm_" + sec + "_" + id;
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
class Usage extends Component{
  constructor(props){
	super(props);
		this.state={
			selectedTab:1,
			expandableitem:"",
			homepage:"home",
			}
		this.tabClicked = this.tabClicked.bind(this);
		this.expandableClicked = this.expandableClicked.bind(this);
		this.pagechangeClicked = this.pagechangeClicked.bind(this);
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
        this.setState({expandableitem:""});
    }
    expandableClicked(id, e) {
        this.setState({expandableitem:id});
    
    }
    pagechangeClicked(id, e) {
        this.setState({homepage:id});
    
    }
    
render(){

    const width=this.props.width;
    const height = this.props.height;
    const seltab= this.state.selectedTab;
    const expclicked_item= this.state.expandableitem;
    const homepage=this.state.homepage;
      if (homepage =="home"){
      return (

        <React.Fragment>
        <div style={{"gridColumn":"2", "gridRow":"1/6"}}>     
           { GetVisPanel(seltab, this.props.width, this.props.height, this.expandableClicked, expclicked_item, this.pagechangeClicked) }
        </div>
        <div style={{"gridColumn":"2", "gridRow":"7", "display":"flex", "flexDirection":"row-reverse"}}>
        	{ divmMenuItem(5, false, seltab, this.tabClicked) }
        	{ divmMenuItem(4, true, seltab, this.tabClicked) }
        	{ divmMenuItem(3, true, seltab, this.tabClicked) }
			{ divmMenuItem(2, true, seltab, this.tabClicked) }
			{ divmMenuItem(1, true, seltab, this.tabClicked) }
        </div>
        </React.Fragment>
    );
   }
   else if(homepage=="agency"){
	   return (
	   <div style={{"display":"grid" ,"gridColumnTemplate":"1em auto", "gridColumn":"2", "gridRow":"1/6"}}>
	   <FontAwesomeIcon style={{"transform": "rotate(-90deg)", "gridColumn":"1"}} icon={faArrowUpRightFromSquare} onClick={()=> this.setState({homepage:"home"})}/>
	   <AgencyHome />
	   </div>
	   );
	   }
	else{
		return(
	   <div style={{"display":"grid", "gridColumnTemplate":"1em auto", "gridColumn":"2", "gridRow":"1/6"}}>
	   <FontAwesomeIcon style={{"transform": "rotate(-90deg)", "gridColumn":"1"}} icon={faArrowUpRightFromSquare} onClick={()=>this.setState({homepage:"home"})}/>
	   <AdminHome/>
	   </div>
		);
		}
  

}

}

export default Usage
