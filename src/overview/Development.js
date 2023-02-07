import React, { Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'



function GetVisPanel(selectedTab, width, height, expclicked, expclicked_item){

    const adim=Math.min(400,width) ;
	const linkstyle={ "color":"#182635" , "textDecoration":"none"};
	if(selectedTab===1){
			return (
				<React.Fragment>
				 
				 <div style={{"gridColumn":"1/2", "gridRow":"1/2", "marginTop":"auto", "marginBottom":"auto", "textAlign":"left", "paddingLeft":"2em"}}>
				    <p style={{ "maxWidth":"80%", "paddingLeft":"1em"}}>Planning and development of the Klamath River Basin(KRB) PIT tagging database began in 2009.</p>
				    <ul>
				    <li>Not a software product</li>
				    <li>Dataset is the most important asset</li>
				    <li>Communication is imperitive for success</li>
				    </ul>
				  </div>
				 </React.Fragment>
				 )
		}else if(selectedTab===2){
			return (<div  style={{"gridColumn":"1/2", "gridRow":"1", "textAlign":"left", "paddingLeft":"2em", "overflow-y":"scroll", "maxHeight":"60vh"}}> 
			            <ul>
			           <li style={{"listStyle":"none"}}><FontAwesomeIcon icon={faWandMagicSparkles} />
			              <a style={linkstyle} onClick={(e) => expclicked(expitmid(7, "dev"), e)}> Database Product Design</a>
				        <div style={expitmstyle(7, expclicked, expclicked_item)}>
				          <ul>
				            <li>Clear definition of the end product</li>
				            <li>Gather information and experiences</li>
				            <li>Review existing effort</li>
				            <li>Present and incorporate new ideas</li>
				            <li>Present a prototype</li>
							<li>Complete and test the end product</li>
							<li>Deploy to the web</li>
							<li>Continue to input data</li>
				          </ul>
				        </div></li>
			           <li style={{ "paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faStar} /><a style={linkstyle} onClick={(e) => expclicked(expitmid(1, "dev"), e)}> Database</a>
				        <div style={expitmstyle(1, expclicked, expclicked_item)}>
				          <ul>
				            <li>Postgresql</li>
				            <li>Accurate</li>
				            <li>Current</li>
				            <li>Prompt</li>
				          </ul>				       
			            </div></li>
			           <li style={{"paddingTop":"1em", "listStyle":"none"}}><FontAwesomeIcon icon={faStar} /><a style={linkstyle} onClick={(e) => expclicked(expitmid(2, "dev"), e)}> Data Pipeline</a>
				        <div style={expitmstyle(2, expclicked, expclicked_item)}>
				          <ul>
				            <li>Electronic Data Collection</li>
				            <li>Alternative Method for Tagging Data Input</li>
				            <li>File Management System</li>
				            <li>Remote Outage System</li>
				          </ul>
				        </div></li>
				        
			              <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faScrewdriverWrench} />
			              <a style={linkstyle} onClick={(e) => expclicked(expitmid(3, "dev"), e)}> Web Interface</a>
				        <div style={expitmstyle(3, expclicked, expclicked_item)}>
				          <ul>
				            <li>Node.js React.js D3.js</li>
				            <li>Secure</li>
				            <li>Web Hosting EROS</li>
				            <li><ul>
				                 <li><dl>
				                       <dt>User Interface</dt>
				                       <dd><ul>
				                           <li>Search for a PIT tag</li>
				                           <li>View maps</li>
				                           <li>Build REST query</li>
				                       </ul></dd>
				                       </dl></li>
				                 <li><dl>
				                       <dt>Administrator Interface</dt>
				                       <dd><ul>
				                           <li>View data submission reports</li>
				                           <li>Find gaps in data</li>
				                           <li>Identify outages</li>
				                           <li>Submit data</li>
				                       </ul></dd>
				                       </dl></li>
				                 <li>REST</li>
				                </ul></li>
				          </ul>
                          </div></li>
			              
			              <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faUserPlus} />
			              <a style={linkstyle} onClick={(e) => expclicked(expitmid(4, "dev"), e)}> Database Working Group</a>
				        <div style={expitmstyle(4, expclicked, expclicked_item)}>
				          <ul>
				            <li>Meet Frequently</li>
				            <li>Will of the Larger Group</li>
				            <li>Details</li>
				            <li>Opportunity</li>
				          </ul>
				        </div></li>
			              <li style={{"paddingTop":"1em", "listStyle":"none"}}><FontAwesomeIcon icon={faUserPlus} />
			              <a style={linkstyle} onClick={(e) => expclicked(expitmid(5, "dev"), e)}> Data Sharing Agreement</a>
				        <div style={expitmstyle(5, expclicked, expclicked_item)}>
				          <ul>
				            <li>Database Working Group</li>
				            <li>Application Permissions</li>
				          </ul>
				        </div></li>
			              <li style={{"paddingTop":"1em","listStyle":"none"}}><FontAwesomeIcon icon={faUserPlus} />
			              <a style={linkstyle} onClick={(e) => expclicked(expitmid(6, "dev"), e)}> Meetings</a>
				        <div style={expitmstyle(6, expclicked, expclicked_item)}>
				          <ul>
				            <li>Policy</li>
				            <li>Feature Request</li>
				            <li>Direction</li>
				            <li>Experiences</li>
				          </ul>
				        </div></li>
			            </ul>
			       </div>)
		}
	}
function expitmstyle(id, expclicked, expclicked_item){
	return {"display":expclicked_item===expitmid(id, "dev")?"block":"none", "border":"solid 1px", "maxWidth":"60%", "padding":"1em", "borderRadius":"5px"}
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
class Development extends Component{
  constructor(props){
	super(props);
		this.state={
			selectedTab:1,
			expandableitem:"",
			}
		this.tabClicked = this.tabClicked.bind(this);
		this.expandableClicked = this.expandableClicked.bind(this);
		}
	tabClicked(id, e) {
        this.setState({selectedTab:id});
        this.setState({expandableitem:""});
    }
    expandableClicked(id, e) {
        this.setState({expandableitem:id});
    
    }
render(){

    const width=this.props.width;
    const height = this.props.height;
    const seltab= this.state.selectedTab;
    const expclicked_item= this.state.expandableitem;
    
      return (

        <React.Fragment>
        <div style={{"gridColumn":"2", "gridRow":"1/6"}}>     
           { GetVisPanel(seltab, this.props.width, this.props.height,this.expandableClicked, expclicked_item) }
        </div>
        <div style={{"gridColumn":"2", "gridRow":"7", "display":"flex", "flexDirection":"row-reverse"}}>
     
			{ divmMenuItem(2, false, seltab, this.tabClicked) }
			{ divmMenuItem(1, true, seltab, this.tabClicked) }
        </div>
        </React.Fragment>
    );
  

}

}

export default Development
