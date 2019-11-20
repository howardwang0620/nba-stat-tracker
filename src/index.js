import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css';
import ScoreBoard from './ScoreBoard/ScoreBoard.jsx';
import GamePage from './GamePage/GamePage.jsx'
import { dateToString } from './functions.jsx'

import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router , Switch, Redirect} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

const date = dateToString(new Date());
const routing = (

  	<Router>
		<Switch>
  			<Route exact path="/" render={() => (
				<Redirect from ="/" to={{
					pathname: '/' + date,
					state: {date: date}
				}} />
			)} /> 

			<Route exact path="/:date" component={ScoreBoard} />
	  		<Route path="/gamepage/:date/:gameid" component={GamePage} />
	  	</Switch>
  	</Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// ReactDOM.render(<Tmp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


