import React, { Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart, faAreaChart, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import SamplingSites from "./../d3/SamplingSites";

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
	function DatabaseText(sectionid, sectionchanged){		
	const linkstyle={ "color":"#182635" , "textDecoration":"none"};
	const clickeditem=expitmid(sectionid, "db");
		return (
		   <div  style={{"gridColumn":"1/2", "gridRow":"1", "textAlign":"left", "paddingLeft":"2em", "overflow-y":"scroll", "maxHeight":"60vh"}}> 
			           <ul>
			           <li style={{"listStyle":"none"}}><FontAwesomeIcon icon={faPieChart} />
			              <a style={linkstyle} onClick={(e) => sectionchanged(1, e)}> PIT Tag Data</a>
				        <div style={expitmstyle(1,  clickeditem)}>
				          <ul>
				            <li>Remote Contacts: 2.5 miliion</li>
				            <li>Trap Efforts:9,000</li>
				            <li>Tags Released: 70,000</li>							
				          </ul>
						</div>
						</li>
			           <li style={{"listStyle":"none"}}><FontAwesomeIcon icon={faAreaChart} />
			              <a style={linkstyle} onClick={(e) => sectionchanged(2, e)}> Metadata</a>
				        <div style={expitmstyle(2,  clickeditem)}>
				          <ul>
				            <li>Files Uploaded: 6500</li>
				            <li>Remote Sites:70</li>
				            <li>Remote Outages: ?</li>						
				          </ul>
						</div>
						</li>
					
			           <li style={{"listStyle":"none"}}><FontAwesomeIcon icon={faIdBadge} />
			              <a style={linkstyle} onClick={(e) => sectionchanged(3, e)}> Roles and Responsibilities</a>
				        <div style={expitmstyle(3,  clickeditem)}>
				          <ul>
				            <li>File Storage</li>
				            <li>Database Administrator</li>
				            <li>Best Version of Data</li>						
				          </ul>
						</div>
						</li>
					
			           <li style={{"listStyle":"none"}}><FontAwesomeIcon icon={faIdBadge} />
			              <a style={linkstyle} onClick={(e) => sectionchanged(4, e)}> Rules and Tools</a>
				        <div style={expitmstyle(4,  clickeditem)}>
				          <ul>
				            <li>File Naming Convention</li>
				            <li>File Packages - Metadata</li>
				            <li>
							   <dl>
							   <dt>Applications and Web Tools</dt>
							   <dd>Encourage rule following</dd>
							   <dd><a  style={linkstyle}  target="_blank" href="https://wil.yegelwel.com/d3-realtime/">Remind us of Rules</a></dd>
							   
							</dl></li>						
				          </ul>
						</div>
						</li>
					</ul>
					</div>
		)
	}
  function expitmstyle(id,  expclicked_item){
	return {"display":expclicked_item===expitmid(id, "db")?"block":"none", "border":"solid 1px", "maxWidth":"60%", "padding":"1em", "borderRadius":"5px"}
	}
  function expitmid(id, sec){
	return "itm_" + sec + "_" + id;
	}
class ProjectFuture extends Component{
  constructor(props){
	super(props);
		this.state={
			selectedTab:1,
			sectionid:0,
			}
		this.tabClicked = this.tabClicked.bind(this);
		this.sectionChanged = this.sectionChanged.bind(this);
		}
		
	sectionChanged(id, e) {
        this.setState({sectionid:id});
        
    }
	tabClicked(id, e) {
        this.setState({selectedTab:id});
        if(id==2){
			this.setState({sectionid:0});
			
		}
    }
render(){

    const width=this.props.width;
    const height = this.props.height;
    const seltab= this.state.selectedTab;
	const sectionid = this.state.sectionid;
    if (seltab===1){
      return (

        <React.Fragment>
        <div style={{"gridColumn":"2", "gridRow":"1/6"}}>     
           <SamplingSites width={ width *.7} height={ height *.9 }/>
        </div>
        <div style={{"gridColumn":"2", "gridRow":"7", "display":"flex", "flexDirection":"row-reverse"}}>
     
			{ divmMenuItem(2, false, seltab, this.tabClicked) }
			{ divmMenuItem(1, true, seltab, this.tabClicked) }
        </div>
        </React.Fragment>
    );
	}
	else{
		return(
		<React.Fragment>
		<div style={{"gridColumn":"2", "gridRow":"1/6"}}>     
           <div>
		   {DatabaseText(sectionid, this.sectionChanged)}
		   </div>
        </div>
        <div style={{"gridColumn":"2", "gridRow":"7", "display":"flex", "flexDirection":"row-reverse"}}>
     
			{ divmMenuItem(2, false, seltab, this.tabClicked) }
			{ divmMenuItem(1, true, seltab, this.tabClicked) }
        </div>
        </React.Fragment>
		);
		
		
	}

}

}

export default ProjectFuture
