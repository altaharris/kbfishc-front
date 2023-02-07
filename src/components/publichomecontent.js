import React, { Component } from 'react'
import  BarChart  from './../d3/AgencyConn.js';



import Header from './header.js';
import Footer from './footer.js';
import LoginContent from './logincontent.js';
import AgencyHome from './../dashboard/agencyhome.js'

class PublicHomeContent extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width,
			error:null,
			isloaded:false,
			data:[],
			loginstate:this.props.loginstate, 
			tokenv:this.props.tokenv,
			}
		this.loginClicked = this.loginClicked.bind(this);
		}
	loginClicked(e) {
		var newloginstate=!this.loginstate;
        this.setState({loginstate:newloginstate});
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
   const width=this.state.width;
   const height=this.state.height;
   const adim=Math.min(400,width) 
   const { error, isLoaded, data } = this.state;
   
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
       if (!this.state.loginstate) {
        if(this.state.tokenv){
			return (
               <AgencyHome width={width} height={height} agency="Admin" onLogInChange={(e) =>this.props.onLogInChange(e)}/>
               )
        }else{
            return (
              <div>     
              <Header width={ width } />           
        
               <div className="App-header"> 
               <button className="login-button" onClick={(e) => this.loginClicked( e)} >
                 Login
               </button>
               <BarChart data={data} size={[adim,adim]}/>
               <p style={{fontSize:80+ '%'}}>
                   A database application to facilitate the sharing and understanding of PIT tag data in the 
                   Klamath River Basin of Southern Oregon and Northern California.
               </p>
               </div>
      
             <Footer />
             </div>
            );
       }
     }
     else{
		 return (
          <div>     
          <Header width={ this.state.width } />           
        
           <div className="App-header"> 
             <LoginContent loggedin={this.state.loginstate} tokenv={ this.state.tokenv } onLogInChange={(e) => this.props.onLogInChange(e)}/>
           </div>
      
         <Footer />
         </div>
        );
		 }
  }
 }
}

export default PublicHomeContent
