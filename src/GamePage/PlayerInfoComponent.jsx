import React from 'react'

import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner'


const PlayerInfoComponent = props => {
	const playerInfo = props.playerInfo
	const headshotPath = props.headshotPath
	const playerName = playerInfo.firstName + " " + playerInfo.lastName;

	const headshotBG = {
		height: '137.61',
		// backgroundColor: '#bbb',
		borderRadius: '50%',
	}
	
	const playerNameStyle = {
		fontWeight: 'bold',
		padding: '10px'
	}
	
	let element;
	if(headshotPath) {
		element = (
			<Image style={headshotBG} src={headshotPath} height="100" roundedCircle/>
		)
	} else {
		element = (
			<Spinner animation="border mx-auto" role="status">
	        	<span className="sr-only">Loading...</span>
	        </Spinner>
		)
	}
	// console.log(playerInfo)
	return <div>
		<div>
			{ element }
		</div>
		<div style={playerNameStyle}>
			{playerName}
		</div>
	</div>



}

export default PlayerInfoComponent;