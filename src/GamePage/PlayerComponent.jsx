import React from 'react'

import PlayerInfoComponent from './PlayerInfoComponent.jsx'
import PlayerGameLogComponent from './PlayerGameLogComponent.jsx'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

export default class PlayerComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: props.date,
			playerInfo: props.playerInfo,
			playerHeadshot: undefined,
			playerGameLog: undefined
		};
	}

	componentDidMount() {
		let playerId = this.state.playerInfo['personId']
		let year = this.state.date.substring(0,4)

		this.fetchHeadshot(playerId);
		this.fetchGameLog(year, playerId);
	}

	componentWillUnmount() {
		
	}

	fetchHeadshot(playerId) {
		//grabs player game log data and player headshot location
		fetch(`/api/getHeadshotPath/?playerId=${encodeURIComponent(playerId)}`)
    	.then(res=>res.json())
    	.then(result=> {
    		this.setState({
    			playerHeadshot: result
    		})
    	})
	}

	fetchGameLog(year, playerId) {
		fetch(`/api/getGameLog/?year=${encodeURIComponent(year)}
			&playerId=${encodeURIComponent(playerId)}`)
		.then(res => res.json())
		.then(result=> {
			this.setState({playerGameLog: result})
		})
	}

	render() {
		const divStyle = {
			paddingTop: '12px',
			paddingBottom: '12px',
			backgroundColor: 'white',
			height: '250px'
		}
		const vertCenterDiv = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}

		return (
			<div className="playerWrapper" style={{height:'100%'}}>
				<div className="playerInfoWrapper" style={divStyle}>
					<Container style={{height:'100%'}}>
						<Row style={{height:'100%'}}>
							<Col xs={6} style={vertCenterDiv}>
								<PlayerInfoComponent playerInfo={this.state.playerInfo} 
								headshotPath={this.state.playerHeadshot}/>
							</Col>
							<Col xs={6} style={vertCenterDiv}>
								<PlayerGameStatsComponent stats={this.state.playerInfo}/>
							</Col>
						</Row>
					</Container>
				</div>
				<div className="playerGameLogWrapper">
					<PlayerGameLogComponent playerInfo={this.state.playerInfo}
					gameLog={this.state.playerGameLog} />
				</div>
			</div>
		)
	}
}

const PlayerGameStatsComponent = props => {
	const stats = props.stats
	return (
		<Table className="playerInfoTable" borderless>
			<tbody>
				<tr>
					<th> PTS </th>
					<td> {stats.points} </td>
					<th> FG </th>
					<td> {stats.fgm + "/" + stats.fga} </td>
				</tr>
				<tr>
					<th> REB </th>
					<td> {stats.totReb} </td>
					<th> AST </th>
					<td> {stats.assists} </td>
				</tr>
				<tr>
					<th> STL </th>
					<td> {stats.steals} </td>
					<th> BLK </th>
					<td> {stats.blocks} </td>
				</tr>
				<tr>
					<th> 3PTM </th>
					<td> {stats.tpm} </td>
					<th> FT </th>
					<td> {stats.ftm + "/" + stats.fta} </td>
				</tr>
				<tr>
					<th> TO </th>
					<td> {stats.turnovers} </td>
				</tr>
			</tbody>
		</Table>
	)
}