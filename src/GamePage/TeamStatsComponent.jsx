import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const TeamStatsComponent = props => {
	let teamInfo = props.teamInfo;
	let stats = props.stats;

	return (
		<div className="teamDataWrapper boxScoreColWrapper">
			<TeamHeader teamInfo={teamInfo} />
			<TeamStats stats={stats} />
		</div>
	)
}

const TeamHeader = props => {
	let teamInfo = props.teamInfo;
	return (
		<div className="teamDataHeaderWrapper container" style={{backgroundColor: teamInfo.primaryColor}}>
			<Row>
				<Col>
					 <Image src={teamInfo.primaryLogo} height="75"/>
				</Col>
				<Col xs={7}>
					<h3 className="headerNameCenter">{teamInfo.fullName}</h3>
				</Col>
			</Row>
		</div>
	)
}

const TeamStats = props => {
	let stats = props.stats;
	return (
		<div className="teamStatsWrapper container">
			stats here
		</div>
	)
}

export default TeamStatsComponent;