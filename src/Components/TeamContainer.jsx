import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image";

import AdvancedTeamContainer from './AdvancedTeamContainer.jsx'

//gameData consists of 2 needed elements: homeTeam, awayTeam
//time contains time string , eg -> Final, Halftime, 12:00 1Q
const TeamContainer = props => {
  const gameData = props.gameData;
  const time = props.time;
  
  return (
      <div className="team-container">
        <TeamNameContainer gameData={gameData}/>
        <TeamLogoContainer gameData={gameData}/>
      </div>
    );
}

//gameData consists of 2 needed elements: homeTeam, awayTeam
const TeamNameContainer = props => {
  const gameData = props.gameData;

  return (
    <div>
     <Row className="game-team-name-container">
        <Col> 
          <h1>{gameData.awayTeam.triCode}</h1>
        </Col>
        <Col xs={2}></Col>
        <Col>
          <h1>{gameData.homeTeam.triCode}</h1>
        </Col>
      </Row>
    </div>
  )
}

//gameData consists of 2 needed elements: homeTeam, awayTeam
const TeamLogoContainer = props => {
  const gameData = props.gameData;
  const time = props.time;

  return (
    <div>
      <Row className="game-team-logo-container">
        <Col>
          <Image src={gameData.awayTeam.alternateLogo} height="50"/>
        </Col>

        <Col xs={2}>
          <h1 className="mx-auto">@</h1>
        </Col>

        <Col> 
          <Image src={gameData.homeTeam.alternateLogo} height="50"/>
        </Col>
      </Row>
    </div>
  )
}

export default TeamContainer;