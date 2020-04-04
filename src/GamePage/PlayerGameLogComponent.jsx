import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const PlayerGameLogComponent = props => {
	const playerInfo = props.playerInfo
	const gamelog = props.gameLog

	function renderGameLogTable() {
		return gamelog.map((game, index) => {
			const monthDate = game.date.substring(4,6) + "/" + game.date.substring(6,8);
			const gameCell = (game.isHomeGame) ? monthDate + " vs " + game.opponentTeam :
												monthDate + " @ " + game.opponentTeam;
			const score = (game.teamScore > game.opponentScore) ? 
				"W " + game.teamScore + "-" + game.opponentScore : 
				"L " + game.teamScore + "-" + game.opponentScore

			let stats = game.stats
			return (
				<tr key={game.gameId}>
					<td>{gameCell}</td>
					<td>{score}</td>
					<td>{stats.min}</td>
					<td>{stats.fgm}/{stats.fga}</td>
					<td>{stats.tpm}/{stats.tpa}</td>
					<td>{stats.ftm}/{stats.fta}</td>
					<td>{stats.totReb}</td>
					<td>{stats.assists}</td>
					<td>{stats.steals}</td>
					<td>{stats.blocks}</td>
					<td>{stats.turnovers}</td>
					<td>{stats.points}</td>
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
					</tr>
				</thead>
				<tbody>
					{renderGameLogTable()}
				</tbody>
			</Table>
			<Button variant="secondary">More</Button>{' '}
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

