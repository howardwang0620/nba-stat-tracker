import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const PlayerGameLogComponent = props => {
	const playerInfo = props.playerInfo
	const gamelog = props.gameLog
	console.log(gamelog)

	function renderGameLogTable() {
		return gamelog.map((game, index) => {
			const monthDate = game.GAME_DATE.substring(5,7) + "/" + game.GAME_DATE.substring(8,10);
			const wl = (game.WL === 0) ? 'L' : 'W' 
			const gameCell = game.MATCHUP + " " + wl;
			const plusMinus = game.PLUS_MINUS > 0 ? "+" + game.PLUS_MINUS : game.PLUS_MINUS
			return (
				<tr key={game.GAME_ID}>
					<td>{monthDate}</td>
					<td>{gameCell}</td>
					<td>{game.MIN}</td>
					<td>{game.FGM}/{game.FGA}</td>
					<td>{game.FG3M}/{game.FG3A}</td>
					<td>{game.FTM}/{game.FTA}</td>
					<td>{game.REB}</td>
					<td>{game.AST}</td>
					<td>{game.STL}</td>
					<td>{game.BLK}</td>
					<td>{game.TOV}</td>
					<td>{game.PTS}</td>
					<td>{plusMinus}</td>
				</tr>
			)
		})
	}

	if(gamelog) {
		return <div className="gameLogWrapper">
			<Table size='sm' className="gameLogTable mb-2">
				<thead>
					<tr>
						<th>Date</th>
						<th>Score</th>
						<th>MIN</th>
						<th>FG</th>
						<th>3PT</th>
						<th>FT</th>
						<th>REB</th>
						<th>AST</th>
						<th>STL</th>
						<th>BLK</th>
						<th>TO</th>
						<th>PTS</th>
						<th>+/-</th>
					</tr>
				</thead>
				<tbody>
					{renderGameLogTable(gamelog)}
				</tbody>
			</Table>
		</div>
	} else {
		return (
			<Spinner animation="border" role="status" style={{marginTop:'20px'}}>
				<span className="sr-only">Loading...</span>
			</Spinner>
		)
	}
}

export default PlayerGameLogComponent;

