import React from 'react'

import Table from "react-bootstrap/Table"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image"; 
import Container from "react-bootstrap/Container";

import ScoreSummary from "./ScoreSummary.jsx" 
import { TeamHeaderOrientEnum } from "../enums.js"


const AdvancedTeamContainer = props => {
	const gameData = props.gameData;
	const time =props.time;

	const awayTeam = gameData.awayTeam;
	const homeTeam = gameData.homeTeam

	return (
		<Container fluid>
			<Row className="advancedTeamContainerRow">
				<TeamComponent orient={TeamHeaderOrientEnum.LEFT} team={gameData.awayTeam} />
				<Col xs={3} className="scoreSummaryColWrapper">
					<ScoreSummary gameData={gameData} time={time} />
				</Col>
				<TeamComponent orient={TeamHeaderOrientEnum.RIGHT} team={gameData.homeTeam} />
			</Row>
		</Container>
	)
}

const TeamComponent = props => {
	const orient = props.orient;

	const team = props.team;
	const teamName = team.triCode;
	const logo = team.alternateLogo;
	const color = team.primaryColor;
	const score = team.score;
	const record = '(' + team.win + '-' + team.loss + ')'
	

	// const dir = direction ? 'rounded-right' : 'rounded-left'
	// const classes = `teamColWrapper ${dir}`
	
	var element;
	if(orient === TeamHeaderOrientEnum.LEFT) {
		return (
			<Col className="teamHeaderColWrapper orient-left rounded-left" style={{backgroundColor: color}}>
				<Row className="teamHeaderRow">
					<Col className="teamStatsCol">
					</Col>
					<TeamInfoCol teamName={teamName} color={color} logo={logo} record={record} />
					<TeamScoreCol score={score} />
				</Row>
			</Col>
		)
	} else if(orient === TeamHeaderOrientEnum.RIGHT) {
		return (
			<Col className="teamHeaderColWrapper orient-right rounded-right" style={{backgroundColor: color}}>
				<Row className="teamHeaderRow">
					<TeamScoreCol score={score}/>
					<TeamInfoCol teamName={teamName} color={color} logo={logo} record={record} />
					<Col className="teamStatsCol">
					</Col>
				</Row>
			</Col>
		)
	}
}

const TeamInfoCol = props => {
	//<h1 style={{margin: '0 auto'}}>{props.teamName}</h1>
	// <h1 style={{margin: '0 auto'}}>{props.teamName}<span style={{fontSize: 'x-small'}}>{props.record}</span></h1>
	return (<Col className="teamInfoCol">
				<Row className="teamColName" style={{margin: '0 auto'}}>
					<h1 style={{margin: '0 auto'}}>{props.teamName}<span style={{fontSize: 'small'}}>{props.record}</span></h1>
				</Row>
				<Row className="teamColLogo">
					<Image src={props.logo} height="75" style={{margin: '0 auto'}} className="mx-auto"/>
				</Row>
			</Col>)
}

const TeamScoreCol = props => {
	return (<Col className="teamScoreCol" xs={3}>
				<span style={{fontSize: 'xxx-large'}}>{props.score}</span>
			</Col>)
}

export default AdvancedTeamContainer;