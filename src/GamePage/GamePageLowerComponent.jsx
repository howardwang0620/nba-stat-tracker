import React from 'react';
import GamePageTeamComponent from './GamePageTeamComponent.jsx'

class GamePageLowerComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			game: this.props.game,
			date: this.props.date
		}
	}

	render() {
		const game = this.state.game;
		const date =this.state.date;
		const homeTeamId = game.homeTeam.teamId;
		const awayTeamId = game.awayTeam.teamId;
		
		return (
			<div className="gamePageLowerComponents mx-auto">
				<GamePageTeamComponent key={awayTeamId} date={date} teamId={awayTeamId} 
									teamStats={game.stats[awayTeamId]} teamData={game.awayTeam}/>
				<GamePageTeamComponent key={homeTeamId} date={date} teamId={homeTeamId} 
									teamStats={game.stats[homeTeamId]} teamData={game.homeTeam}/>
			</div>
		)
	}
}

export default GamePageLowerComponent;