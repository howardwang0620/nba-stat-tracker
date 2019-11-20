import React from 'react';

import './GamePage.css'
import GameComponent from '../Components/GameComponent.jsx'
import GamePageLowerComponent from './GamePageLowerComponent.jsx'
import PlayByPlayComponent from './PlayByPlayComponent.jsx'
import { dateToString } from '../functions.jsx'

// import Container from "react-bootstrap/Container"; 
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col"; 
// import Image from "react-bootstrap/Image"; 
import Spinner from "react-bootstrap/Spinner";

const NUM_OF_PLAYS = 15;

class GamePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.gameid,
	      	date: this.props.match.params.date,
	      	game: undefined,
	      	playbyplay: [],
	      	finished: false
	    }
	}
	

	//need to split into 2 diff fetches
	//need to double fetch here, play by play and getboxscore, call in sequence
	fetchData() {
		this.fetchBoxScore(this.fetchPlayByPlay);
	}


	fetchBoxScore = (_callback, state) => {
		fetch(`/api/getBoxScore?date=${encodeURIComponent(this.state.date)}&id=${encodeURIComponent(this.state.id)}`)
	    .then(res=>res.json())
	    .then(result => {
	    	_callback(result, result.gameData.period.current)
			// this.setState({
			// 	game: result,
			// 	period: result.gameData.period.current
			// });
		});
	}


	fetchPlayByPlay = (game, period) => {
		if(period === 0) {
			this.setState({
				game: game,
				period: period
			});
    	} else {
    		fetch(`/api/getPlayByPlay?date=${encodeURIComponent(this.state.date)}
					&id=${encodeURIComponent(this.state.id)}
					&period=${encodeURIComponent(period)}`)
			.then(res=>res.json())
	    	.then(result => {

				let pbpArray = [...this.state.playbyplay];
				pbpArray[period-1] = result;
				this.setState({
					game: game,
					period: period,
					playbyplay: pbpArray,
					finished: (game.gameData.statusNum === 3)
				})
	    	});
    	}
	}

	componentDidUpdate() {
		if(this.state.finished) clearInterval(this.interval)
	}

	componentDidMount() {
		this.fetchData();
		this.interval = setInterval(() => this.fetchData() , 5000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}


	render() {
		let key = this.state.id;
		let date = this.state.date;
		let game = this.state.game;
		let playbyplay = this.state.playbyplay;

		console.log(game)
		
		if(game) {
			//should check if stats exists here
			//make new component called gamepagelowercomponents
			let stats = game.stats;
			let element;
			if(stats) {
				element = <GamePageLowerComponent key={key} game={game} date={date}/>
			}


			return (
					<div className="App">
						<div className="gamePage">
							<div className="gamePageGameComponentWrapper mx-auto">
								<GameComponent key={key} game={game} date={date}/>
							</div>

							{element}
						</div>
					</div>
				)


		} else {
			return (
				<div className="spinnerIcon">
					<Spinner animation="border mx-auto" role="status">
					  <span className="sr-only">Loading...</span>
					</Spinner>
				</div>

			)
		}
	}
}

export default GamePage;