import React, { Component } from 'react'
import {Link} from 'react-router-dom';


class HeaderAgency extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width,
			logout:false
			}
		this.logoutSubmit= this.logoutSubmit.bind(this);
		}
	logoutSubmit(e) {       
        e.preventDefault();
        this.setState({logout:true});
        
    }
	render(){
	    const cn = this.props.width>1450?"App-bar-slim":"App-bar";
	    const logout=this.state.logout;
	    if (logout){
			localStorage.removeItem('token');
            this.props.onLogInChange(false);
			return <div></div>;
	    }
	    else{
		  return(
	
            <header className={cn}>   
	         <nav class="main-nav">
	          <Link to="/">Home</Link>
	          <Link to="/krb/summary-data">Summary Data</Link>
	          <Link to="/krb/my-fish">My Fish Summaries</Link>
	          <Link to="/krb/remote">Remote Time Series</Link>
	          <Link to="/krb/my-data">Browse My Data</Link>
	          <Link to="/krb/maps">Explore Maps</Link>
	          <Link to="/krb/submit-data">Submit Data</Link>
	          <Link to="/krb/summary-data">Tag Lookup</Link>
	          <Link to="/logout"  onClick={(e) => this.logoutSubmit( e)} >Logout</Link>
	      
	         </nav>
            </header>
        
	    )
	  }
	}
}

export default HeaderAgency
