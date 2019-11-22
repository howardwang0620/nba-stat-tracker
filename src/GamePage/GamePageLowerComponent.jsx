import React from 'react';
import GamePageTeamComponent from './GamePageTeamComponent.jsx'

const GamePageLowerComponent = props => {
	const game = props.game;
	const date = props.date;
	const inactive = props.inactive;

	const homeTeamId = game.homeTeam.teamId;
	const awayTeamId = game.awayTeam.teamId;
	
	return (
		<div className="gamePageLowerComponents mx-auto">
			<GamePageTeamComponent key={awayTeamId} date={date} teamId={awayTeamId} 
								teamStats={game.stats[awayTeamId]} teamData={game.awayTeam}
								inactive={inactive}/>
			<GamePageTeamComponent key={homeTeamId} date={date} teamId={homeTeamId} 
								teamStats={game.stats[homeTeamId]} teamData={game.homeTeam}
								inactive={inactive}/>
		</div>
	)
}

export default GamePageLowerComponent;