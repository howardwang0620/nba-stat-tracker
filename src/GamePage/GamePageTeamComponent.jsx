import React from 'react';
import BoxScoreComponent from './BoxScoreComponent.jsx'
import TeamComponent from './TeamComponent.jsx'
import BoxScorePlayerComponent from './BoxScorePlayerComponent.jsx'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


/*

display two things -> player component | box score component
needs only team data for box score component part

should take:
	-team id
	-team stats
	-team data


*/
const GamePageTeamComponent = props => {
	const date = props.date;
	const teamId = props.teamId;
	const data = props.teamData;
	const stats = props.teamStats;
	const inactive = props.inactive;
		
	//pass click function to use in BoxScoreComponent <tr>
	if(stats) {
		return (
			<div className="boxScoreWrapper container-fluid">
				<Row>
					<Col className="teamDataCol" xs={4}>
						<TeamComponent teamInfo={data} stats={stats} />
					</Col>
					<Col className="boxScoreCol" xs={8}>
						<BoxScoreComponent key={teamId} teamId={teamId} stats={stats} data={data} inactive={inactive} />
					</Col>
				</Row>
			</div>
		)
	} else {

		//NEED TO FIX
		return (
			<div className="noGameWrapper mx-auto">
				Game hasnt started
			</div>
		)
	}
}

export default GamePageTeamComponent;