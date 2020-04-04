import React from 'react'

import Table from "react-bootstrap/Table"; 
// import Row from "react-bootstrap/Row"; 
// import Col from "react-bootstrap/Col"; 
// import Image from "react-bootstrap/Image"; 
// import Container from "react-bootstrap/Container"; 

function getScoreElements(triCode, linescore) {
	
	while(linescore.length < 4) {
		linescore.push({score: "0"})
	}

	let otElement;
	let modLineScore = linescore.slice(0, 4)
	if(linescore.length > 4) {

		const otScore = linescore.slice(4 - linescore.length)
		.reduce((acc, val) => parseInt(acc.score) + parseInt(val.score));

		otElement = <td key="5" >{otScore}</td>
	}

	return (
		<tr>
			<td>{triCode}</td>
			{
				modLineScore.map((e, i) => {
					return <td key={(i+1) + ' ' + e.score} >{e.score}</td>
				})
			}
			{otElement}
		</tr>
	)

}

function renderTable(time, awayTeam, homeTeam) {
	var otElement; 

	//FIX MULTIPLE OVERTIME USING HOVER COMPONENT
	//FOR NOW GROUP TOGETHER OT'S AND DISPLAY
	if(awayTeam.linescore.length > 4)  {
		otElement = <td>OT</td>
	};

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