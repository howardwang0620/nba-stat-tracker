import React from 'react';
import TableComponent from './TableComponent.jsx'
import TeamStatsComponent from './TeamStatsComponent.jsx'
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
class BoxScoreComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			teamId: props.teamId,
			teamStats: props.teamStats,
			teamData: props.teamData,
			date: props.date
		}
	}

	render() {
		let date = this.state.date;
		let teamId = this.state.teamId;
		let data = this.state.teamData;
		let stats = this.state.teamStats;

		// console.log(data)
			
		//pass click function to use in tablecomponent <tr>
		if(stats) {
			return (
				<div className="boxScoreWrapper container-fluid">
					<Row>
						<Col className="teamDataCol" xs={4}>
							<TeamStatsComponent data={data} stats={stats}/>
						</Col >
						<Col className="boxScoreCol" xs={8}>
							<TableComponent key={teamId} teamId={teamId} stats={stats} data={data}/>
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

}

export default BoxScoreComponent;