import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const TeamComponent = props => {
	const teamInfo = props.teamInfo;
	const stats = props.stats;

	console.log(stats)

	return (
		<div className="teamDataWrapper boxScoreColWrapper">
			<TeamHeader teamInfo={teamInfo} />
			<TeamSummary teamInfo={teamInfo} stats={stats}/>
			<TeamStats stats={stats} />
		</div>
	)
}

const TeamHeader = props => {
	const teamInfo = props.teamInfo;
	return (
		<div className="teamDataHeaderWrapper container" style={{backgroundColor: teamInfo.primaryColor}}>
			<Row className="teamHeaderLabel">
				{teamInfo.fullName}
			</Row>
		</div>
	)
}

const TeamSummary = props => {
	const teamInfo = props.teamInfo;
	const stats = props.stats;
	console.log(teamInfo)
	console.log(stats)
	return (
		<Row className="teamSummaryWrapper">
			<Col className="teamSummaryLogoCol">
				<Image src={teamInfo.primaryLogo} height="50" />
			</Col>
			<Col className="teamSummaryTotalsCol">
				Totals here
			</Col>
		</Row>
	)
}

const TeamTotals = props => {
	const stats = props.stats;
}

const TeamStats = props => {
	const stats = props.stats;
	return (
		<div className="teamStatsWrapper container">
			stats here
		</div>
	)
}

export default TeamComponent;