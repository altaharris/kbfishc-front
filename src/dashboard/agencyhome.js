import React, { Component } from 'react'
import { Route} from 'react-router-dom';

import HeaderAgency from './../components/headeragency.js';
import Footer from './../components/footer.js';
import SummaryData from './summarydata.js';
import KRBmaps from './krbmaps.js';


class AgencyHome extends Component{
	constructor(props){
		super(props);
		this.state={
			width:this.props.width,
			agency:this.props.agency,
			}
		}
	
	render(){
	const width=this.props.width;
	const height = this.props.height;
	const widthval=Math.min(width, height*.65);
	const agency = this.state.agency;
	return(
	  <div>
	    <HeaderAgency width={ width }  onLogInChange={(e) => this.props.onLogInChange(e)}/>
	    <div className="App-header">
	      
            <Route path='/krb/summary-data'>
                 <SummaryData agency={agency} width={width} height={height}/>
            </Route>
            <Route path='/krb/my-fish'>
                 <div>My Fish</div>
            </Route>
            <Route path='/krb/remote'>
                 <div>Remote Time Series</div>
            </Route>
            <Route path='/krb/my-data'>
                 <div>My Data</div>
            </Route>
            <Route path='/krb/maps'>
                 <KRBmaps agency={agency} width={width} height={height}/>
            </Route>
            <Route path='/krb/submit-data'>
                 <div>Submit Data</div>
            </Route>
            <Route path='/krb/tag-lookup'>
                 <div>Tag Lookup</div>
            </Route>
          
	    </div>
        <Footer />
	  </div>
	)
}
	}

export default AgencyHome
