import React, { useState }from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import useWindowDimensions  from './components/WindowDim.js';


import PublicHomeContent from './components/publichomecontent.js';

import AgencyHome from './dashboard/agencyhome.js'
import KRBoverview from './overview/krboverview.js';





function App() {
 

  const { height, width } = useWindowDimensions();
  const [loggedin, setLoggedIn]=useState(false);
  const token = localStorage.getItem('token');

  if(!token && !loggedin ) {
    return (
           <div className="App">     
    
             <BrowserRouter>
               <PublicHomeContent width={width} loginstate={ false } tokenv={ false } onLogInChange={(e) => setLoggedIn(e)}/>
             </BrowserRouter>  
           </div>
         )
  }  
  return (
  <div className="App">     
    
    <BrowserRouter>
        <Route exact path='/'>
           <PublicHomeContent width={width} loginstate={ false } tokenv={ true } onLogInChange={(e) => setLoggedIn(e)}/>
        </Route>  
        <Route path='/krb'>
           <AgencyHome width={width} height={height} agency="Admin" onLogInChange={(e) => setLoggedIn(e)}/>
        </Route>    
        <Route path='/overview'>
           <KRBoverview width={width} height={height}/>
        </Route>
    </BrowserRouter>  
   </div>
  );
}

export default App;
