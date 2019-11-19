import React from 'react';
import BoxScoreComponent from './BoxScoreComponent.jsx'

class GamePageLowerComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			game: this.props.game,
			date: this.props.date
		}
	}

	render() {
		let game = this.state.game;
		let date =this.state.date;
		let homeTeamId = game.homeTeam.teamId;
		let awayTeamId = game.awayTeam.teamId;
		
		return (
			<div className="gamePageLowerComponents mx-auto">
				<BoxScoreComponent key={awayTeamId} date={date} teamId={awayTeamId} 
									teamStats={game.stats[awayTeamId]} teamData={game.awayTeam}/>
				<BoxScoreComponent key={homeTeamId} date={date} teamId={homeTeamId} 
									teamStats={game.stats[homeTeamId]} teamData={game.homeTeam}/>
			</div>
		)
	}
}

export default GamePageLowerComponent;