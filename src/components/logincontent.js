import React, { Component} from 'react';
import { isExpired, decodeToken } from "react-jwt";


class LoginContent extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width,
			username:"",
			password:"",
			token:null,
			logincomplete:false,
			loginstart:false,
			loggedin:this.props.loggedin,
			agency:null
			}
		this.usernameChanged = this.usernameChanged.bind(this);
		this.passwordChanged = this.passwordChanged.bind(this);
		this.loginSubmit= this.loginSubmit.bind(this);
		}
	usernameChanged(e) {
        this.setState({username:e.target.value});
    
    }
	passwordChanged(e) {
        this.setState({password:e.target.value});
    
    }

	loginSubmit(e) {

        
        const uname= this.state.username;
        const pw = this.state.password;
        e.preventDefault();
        this.setState({
            loginstart: true,
            logincomplete: false
          });
          
        fetch("http://rover-n:3000/login", {
			   method: 'POST',
			   headers: {
				 'Content-Type': 'application/json'
			   },
			   body: JSON.stringify({username:uname, password:pw})
			 })
				  .then(res => res.json())
				  .then(
					(result) => {
					  const dtoken=decodeToken(result["token"]);
					  if (dtoken){
					      this.setState({
						  logincomplete: true,
						  loginstart:false,
						  token: dtoken,
						  agency:result["agency"]
						
				    	  });
						this.props.onLogInChange(true);
				      }else{
						  this.setState({
							  loggedin:false,
						      logincomplete: true,
						      loginstart:false,
							  });
						  }
					  
					},
					// Note: it's important to handle errors here
					// instead of a catch() block so that we don't swallow
					// exceptions from actual bugs in components.
					(error) => {
					  this.setState({
						isLoaded: true,
						logincomplete:true,
						loginstart:false,
						error
					  });
					}
                 )
	}
        

	render(){

	const { token,  loginstart, logincomplete, error } = this.state;
	
	
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!logincomplete && loginstart) {
      return <div>Loading...</div>;
    } else {
		if(!token){
			return(
			<div className="App-header">
			  <form onSubmit={(e) => this.loginSubmit( e)}>
			  <div className="grid-single">
			   <div style={{"gridRow":1, "gridColumn":1}}>
				<label>
				   User Name:
				  <input type="text" name="userName" className="text-inp" onChange={(e) => this.usernameChanged( e)}/>
				</label>
				</div>
				<div style={{"gridRow":2, "gridColumn":1}}>
				<label>
				   Password:
				  <input type="password" name="pword"  className="text-inp"  onChange={(e) => this.passwordChanged( e)}/>
				</label>
				</div>
				<input type="submit" value="Log In"  className="text-inp" style={{ "gridRow":3, "gridColumn":1}} />
				</div>
			 </form>
			</div>
			)
		}else{
			localStorage.setItem('token',this.state.token);
			return  <div></div>
				
			}
		
	}
	
	}
}


export default LoginContent
