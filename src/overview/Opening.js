import React, { Component } from 'react'
import  BarChart  from './../d3/AgencyConn.js';
import ScaleLoader from "react-spinners/ScaleLoader";
import BasinMap from "./BasinMap.js"
import Experience from "./Experience.js"

import weirpic from './img/2007WeirInstall.jpg';
import clpic from './img/ClearLake.jpg';

function GetVisPanel(selectedTab, width, height, data, clicks, imgClick){

    const adim=Math.min(400,width) 
	
	if(selectedTab===1){
			return (
				<React.Fragment>
				
				  <div style={{"gridColumn":"1/2", "gridRow":"1/2", "paddingLeft":"10em"}}>
				    <BarChart data={data} size={[adim,adim]}/>
				   </div>
				   <div  style={{"gridColumn":"1/3", "gridRow":"3"}}>
				     <p style={{'fontSize':'80%', "width":"80%", "paddingLeft":"1em"}}>
					   A database application to facilitate the sharing and understanding of PIT tag data in the 
					   Klamath River Basin of Southern Oregon and Northern California.
				     </p>
				   </div>
				 </React.Fragment>
				 )
		}else if(selectedTab===2){
			return <div  style={{"gridColumn":"1/3", "gridRow":"1"}}> <BasinMap  width={ width * .7 } height={ height }/></div>
		}else if(selectedTab===3){
			return (
			       <div  style={{"gridColumn":"1/3", "gridRow":"1"}}> 
			         <Experience  width={ width * .65 } height={ height *.7}/>
			       </div>
			         )
		}else if(selectedTab===4){
			return (
			       <div style={{"textAlign":"left"}}><ul>
			         <li>To curate and disseminate ecological data with the hope that our efforts will aid in the recovery of endangered species.</li>
			         <li style={{"paddingTop":"1em"}}>To produce novel solutions to data related issues that ensure the quality and accessibility of our data without making things more difficult for the people
			         collecting it.</li>
			       </ul></div>
			       )
		}else if(selectedTab===5){
			return <div style={{"gridColumn":"1/2", "gridRow":"1/2"}}><img onClick={(e) => imgClick(e)} src={ clicks===1?weirpic:clicks==2?clpic:null } style={{ "width":"800px", "height":"auto" }} /></div>
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
class Opening extends Component{
  constructor(props){
	super(props);
		this.state={
			width:this.props.width,
			agency:this.props.agency,
			selectedTab:1,
			error:null,
			isLoaded:false,
			data:[],
			imgclick:1
			}
		this.tabClicked = this.tabClicked.bind(this);
		this.imgClicked = this.imgClicked.bind(this);
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
    
    }
	imgClicked(e) {
		const clickcount= this.state.imgclick
        this.setState({imgclick:clickcount<2?clickcount+1:1});
    
    }
  componentDidMount() {
    fetch("http://rover-n:3000/agency-conn")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render(){
    const width=this.props.width;
    const height = this.props.height;
    const seltab=this.state.selectedTab
    const clickcount= this.state.imgclick
    const { error, isLoaded, data } = this.state;
    
     if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <React.Fragment>
        <div style={{"gridColumn":"2", "gridRow":"1/6"}}>
           <div style={{ "display":"grid", "gridTemplateRows":"auto auto", "gridTemplateColumns":"auto auto auto" }}>   
			  { GetVisPanel(seltab, this.props.width, this.props.height, data, clickcount, this.imgClicked) }
			</div>
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
  }


}

export default Opening
