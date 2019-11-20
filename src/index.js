import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import GamePage from './GamePage.jsx'
import { dateToString } from './functions.jsx'

import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router , Switch, Redirect} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

const routing = (

  	<Router>
			<Route exact path="/" component={App} />
	  		<Route path="/gamepage/:date/:gameid" component={GamePage} />
  	</Router>
)

/*

<Route exact path="/" render={() => (
				<Redirect from ="/" to={{
					pathname: '/' + date,
					state: {date: date}
				}} />
			)} /> 


*/


ReactDOM.render(routing, document.getElementById('root'));

// ReactDOM.render(<Tmp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


