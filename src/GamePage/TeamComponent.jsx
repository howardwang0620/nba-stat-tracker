import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const TeamComponent = props => {
	const teamInfo = props.teamInfo;
	const stats = props.stats;

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

//row component
const TeamSummary = props => {
	const teamInfo = props.teamInfo;
	const stats = props.stats;

	return (
		<Row className="teamSummaryWrapper">
			<Col className="teamSummaryLogoCol">
				<Image src={teamInfo.primaryLogo} height="100" className="centeredColImage" />
			</Col>
			<TeamTotals stats={stats}/>
		</Row>
	)
}


//col component
const TeamTotals = props => {
	const stats = props.stats;
	const totals = stats.totals;

	// console.log(totals)

	return (
		<Col className="teamSummaryTotalsCol">
			<br></br>
			PTS: {totals.points}
			<br></br>
			FG: {totals.fgm}/{totals.fga}
			<br></br>
			FT: {totals.ftm}/{totals.fta}
			<br></br>
			REB: {parseInt(totals.defReb) + parseInt(totals.offReb)} ({totals.defReb}, {totals.offReb})
			<br></br>
			AST: {totals.assists}
			<br></br>
		</Col>
	)
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