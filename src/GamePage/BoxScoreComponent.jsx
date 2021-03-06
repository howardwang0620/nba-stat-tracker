import React from 'react';

import Table from 'react-bootstrap/Table'

//TableComponent gets passed a prop
//TEAM INFO: id, etc.
//STATS
const BoxScoreComponent = props => {
	const teamId = props.teamId;
	const stats = props.stats;
	const data = props.data;
	const inactive = props.inactive;
	
	// console.log(data.triCode)
	// console.log(stats.activePlayers)

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
			const dnp = player['dnp']
			if(dnp) {
				return (	
					<tr key={player.personId} style={ index === 4 ? {borderBottom: '2pt solid black'} : {}}
						onClick={() => props.onClick(player.personId)}>
						<td id='nameTD'>{name}</td>
						<td colSpan='10' style={{textAlign: 'left'}}>{dnp}</td>
					</tr>
				)
			}
			return (
				<tr key={player.personId} style={ index === 4 ? {borderBottom: '2pt solid black'} : {}}
					onClick={() => props.onClick(player.personId)}>
					<td id='nameTD' style={ (isOnCourt && !inactive) ? { fontWeight: 'bold' } : { fontWeight: 'normal' } }>{name}</td>
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
			<Table hover id={teamId}>
				<thead>
					<tr>
						<th style={{background: bgColor, borderTop: "none"}}></th>
						<th style={{background: bgColor, borderTop: "none"}}>MIN</th>
						<th style={{background: bgColor, borderTop: "none"}}>FG</th>
						<th style={{background: bgColor, borderTop: "none"}}>3PT</th>
						<th style={{background: bgColor, borderTop: "none"}}>FT</th>
						<th style={{background: bgColor, borderTop: "none"}}>REB</th>
						<th style={{background: bgColor, borderTop: "none"}}>AST</th>
						<th style={{background: bgColor, borderTop: "none"}}>STL</th>
						<th style={{background: bgColor, borderTop: "none"}}>BLK</th>
						<th style={{background: bgColor, borderTop: "none"}}>TO</th>
						<th style={{background: bgColor, borderTop: "none"}}>PTS</th>
					</tr>
				</thead>
				<tbody>
					{renderTableData()}
				</tbody>
			</Table>
		</div>
	)
}

export default BoxScoreComponent;

