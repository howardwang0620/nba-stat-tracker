import React from 'react';

import Table from 'react-bootstrap/Table'

//TableComponent gets passed a prop
//TEAM INFO: id, etc.
//STATS
const TableComponent = props => {
	let teamId = props.teamId;
	let stats = props.stats;
	let data = props.data;
	let finished = false;

	function renderTableData() {

		//min, fg (m/a), 3pt (m/a), ft (m/a), reb, ast, to, st, blk, pts
		return stats.activePlayers.map((player, index) => {
			const {min, points, assists, steals, blocks, turnovers} = player;
			const name = player['firstName'] + ' ' + player['lastName'];
			const rebounds = +player['defReb'] + +player['offReb'];
			const fg = player['fgm'] + "/" + player['fga'];
			const tpg = player['tpm'] + "/" + player['tpa'];
			const ft = player['ftm'] + "/" + player['fta'];

			const isOnCourt = player['isOnCourt'];
			
			return (
				<tr key={player.personId} style={ index === 4 ? {borderBottom: '2pt solid black'} : {}}>
					<td id='nameTD' style={ isOnCourt ? { fontWeight: 'bold' } : { fontWeight: 'normal' } }>{name}</td>
					<td>{min}</td>
					<td title={player['fgp'] + '%'}>{fg}</td>
					<td title={player['tpp'] + '%'}>{tpg}</td>
					<td title={player['ftp'] + '%'}>{ft}</td>
					<td>{rebounds}</td>
					<td>{assists}</td>
					<td>{steals}</td>
					<td>{blocks}</td>
					<td>{turnovers}</td>
					<td>{points}</td>
				</tr>
			)
		})
	}

	const bgColor = data.primaryColor;
	return (
		<div className="tableWrapper boxScoreColWrapper">
			<table className="table table-condensed table-hover" id={teamId}>
				<thead>
					<tr>
						<th style={{background: bgColor}}>PLAYER</th>
						<th style={{background: bgColor}}>MIN</th>
						<th style={{background: bgColor}}>FG</th>
						<th style={{background: bgColor}}>3PT</th>
						<th style={{background: bgColor}}>FT</th>
						<th style={{background: bgColor}}>REB</th>
						<th style={{background: bgColor}}>AST</th>
						<th style={{background: bgColor}}>STL</th>
						<th style={{background: bgColor}}>BLK</th>
						<th style={{background: bgColor}}>TO</th>
						<th style={{background: bgColor}}>PTS</th>
					</tr>
				</thead>
				<tbody>
					{renderTableData()}
				</tbody>
			</table>
		</div>
	)
}

export default TableComponent;