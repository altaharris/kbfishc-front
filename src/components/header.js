import React, { Component } from 'react'


class Header extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width
			}
		}
	render(){
	return(
	
	<header className="App-bar">
	    <p style={{color:'white', fontSize:"180%", paddingTop:"4vmin", marginTop:0, width:this.state.width}}>
          Klamath River Basin PIT Tagging Database
        </p>
    </header>
        
	)
	
	}
}

export default Header
