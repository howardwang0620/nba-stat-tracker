import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image"; 


//MAKE SURE GAMEDATA PASSED INTO PROPS HAS 2 CHILDREN:
//HOMETEAM AND AWAYTEAM
const TeamContainer = props => {
  let gameData = props.gameData;
  return (
    <div className="team-container">
      <TeamNameContainer gameData={gameData}/>
      <TeamLogoContainer gameData={gameData}/>
    </div>
  )
}

const TeamNameContainer = props => {
  let gameData = props.gameData;
  return (
    <Row className="game-team-name-container">
      <Col> 
        <h1>{gameData.awayTeam.triCode}</h1>
      </Col>
      <Col xs={2}></Col>
      <Col>
        <h1>{gameData.homeTeam.triCode}</h1>
      </Col>
    </Row>
  )
}

const TeamLogoContainer = props => {
  let gameData = props.gameData;
  return (
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
    )
}

export default TeamContainer;