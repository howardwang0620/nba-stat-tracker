import React from 'react'

import Table from "react-bootstrap/Table"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image"; 
import Container from "react-bootstrap/Container"; 

function getScoreElements(triCode, linescore) {
	
	while(linescore.length < 4) {
		linescore.push({score: "0"})
	}

	var otScore = 0;

	return (
		<tr>
			<td>{triCode}</td>
			{ 
				linescore.map((e, i) => {
					if(i > 3) {
						otScore += e.score;
					}
					if(i == linescore.length && otScore != 0) return <td key={'5 ' + otScore}>{otScore}</td>
					return <td key={(i+1) + ' ' + e.score} >{e.score}</td>
				}) 
			}
		</tr>
	)

}

function renderTable(time, awayTeam, homeTeam) {
	var awayOt = 0;
	var homeOt = 0;

	var otElement; 
	if(awayTeam.linescore.length > 4)  otElement = <td>OT</td>;

	return (
		<Table id="scoreSummaryTable" variant="dark">
			<thead className="tablePeriodHeader">
				<tr>
					<td></td>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					{ otElement }
				</tr>
			</thead>

			<tbody>
				{ getScoreElements(awayTeam.triCode, awayTeam.linescore) }
				{ getScoreElements(homeTeam.triCode, homeTeam.linescore) }
			</tbody>
		</Table>

	)
}

const ScoreSummary = props => {
	const gameData = props.gameData;
	const awayTeam = gameData.awayTeam;
	const homeTeam = gameData.homeTeam;
	const time = props.time;
	
	// console.log(gameData)
	return (
		
		<div className="scoreSummaryWrapper">
			<div className="scoreSummaryTime">
				{time}
			</div>
			{renderTable(time, awayTeam, homeTeam)}
		</div>
	)
}

export default ScoreSummary;