import React from 'react';
import BoxScoreComponent from './BoxScoreComponent.jsx'
import TeamComponent from './TeamComponent.jsx'
import PlayerComponent from './PlayerComponent.jsx'

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
class GamePageTeamComponent extends React.Component {
	constructor(props) {
		super(props);
		
		var topPerformer = this.topPerformer(this.props.teamStats.activePlayers)
		this.state = {
			date: this.props.date,
			teamId: this.props.teamId,
			data: this.props.teamData,
			stats: this.props.teamStats,
			inactive: this.props.inactive,
			playerId: topPerformer
		}
	}

	//calculate best
	topPerformer(stats) {
		var calcStats = stats.map(player => {
			
			//if player not playing return 0
			if(player.dnp) return {
				personId: player.personId,
				value: 0
			}

			//calculate top player based on dfs formula
			return {
				personId: player.personId,
				value: parseInt(player.points) + (parseInt(player.totReb) * 1.2) + (parseInt(player.assists) * 1.5) + 
				(parseInt(player.blocks) * 2) + (parseInt(player.steals) * 2) - parseInt(player.turnovers)
			}
		})

		calcStats.sort(function(a, b) {
  			return b.value - a.value;
		})

		return calcStats[0].personId;
	}

	onClick = (playerId) => {
		this.setState({
			playerId: playerId
		})
	}

	render() {
		const date = this.state.date;
		const teamId = this.state.teamId;
		const data = this.state.data;
		const stats = this.state.stats;
		const inactive = this.state.inactive;
		const playerId = this.state.playerId;

		const teamNameDivStyle = {
			height: '50px',
			backgroundColor: data.primaryColor,
			display: 'flex',
    		alignItems: 'center',
    		justifyContent: 'center'
		}
		const teamNameFontStyle = {
			color: 'white',
			fontWeight: 'bold',
			fontSize: 'x-large'
		}
		
		//obtain stats for focused player to pass onto PlayerComponen
		const focusedPlayerStats = stats.activePlayers.filter(x => x['personId'] == playerId)[0]
		//pass click function to use in BoxScoreComponent <tr>
		if(stats) {
			return (
				<div className="boxScoreWrapper container-fluid">
					<Row>
						<Col className="teamDataCol" xs={4}>
							{/*<TeamComponent teamInfo={data} stats={stats} />*/}
							<div className="teamDataColWrapper" style={{height:'100%'}}>
								<div style={teamNameDivStyle}>
									<span style={teamNameFontStyle}>{data.fullName}</span>
								</div>
								
								<PlayerComponent key={playerId} playerInfo={focusedPlayerStats} date={date}/>
							</div>
						</Col>
						<Col className="boxScoreCol" xs={8}>
							<BoxScoreComponent key={teamId} teamId={teamId} stats={stats} data={data} inactive={inactive} onClick={this.onClick}/>
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

export default GamePageTeamComponent;