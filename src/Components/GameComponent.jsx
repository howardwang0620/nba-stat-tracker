import React from 'react';
import TeamContainer from './TeamContainer.jsx'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 

import moment from "moment-timezone";


/*

Takes (game, date) 
  -Game is an object with children: gameData, awayTeam, homeTeam
  -Date is a string in format: YYYYMMDD

*/
const GameComponent = props => {

	let game = props.game;
  let date = props.date;

  let status = game.gameData.statusNum;
  let bgColor = game.homeTeam.primaryColor;

  //MAY NEED TO UPDATE
  let gameId = game.gameData.gameId;
  let scoreKey = game.awayTeam.score + game.homeTeam.score;
  // let timeKey = game.gameData.clock;

  return (
    <div className="gameComponentWrapper rounded" style={{backgroundColor: bgColor}}>
        <div className="container-fluid">
          <TeamContainer key={gameId} gameData={game} />
          <GameScoreContainer key={scoreKey} game={game} status={status} />
          <GameTimeContainer game={game} status={status} />
        </div>
      </div>
  );
}

//status to see if game score should be displayed
/*
1 -> "-"
2 -> "0 - 0"
3 -> "0 - 0"
*/
const GameScoreContainer = props => {
  let game = props.game;
  let status = props.status;
  let gameActivated = game.gameData.isGameActivated;
  let element;

  if(status === 2 || status === 3) {
    element = (<Row className="game-score-container"><Col>
                <h2 className="mx-auto">{game.awayTeam.score}</h2>
              </Col>    
              <Col xs={2}></Col>
              <Col>
                <h2 className="mx-auto">{game.homeTeam.score}</h2>
              </Col></Row>)
  } else {
    if(gameActivated) {
      element = (<h2 className="mx-auto"> 
                  0 - 0
                </h2>);
    } else {
      element = (<h2 className="mx-auto"> 
                  -
                </h2>);
    }
  }

  return (
    <div className="game-component-container">
      {element}
    </div>
    )
}

//status to see if game time should be displayed
/*
1 -> display: 4:00PM Eastern
2 -> display: 1Q - 12:00
3 -> display: FINAL
*/
const GameTimeContainer = props => {
  let game = props.game;
  let status = props.status;
  let isHalf = game.gameData.period.isHalftime;
  let isEndOfPeriod = game.gameData.period.isEndOfPeriod;
  let element;
  
  let time = new Date(game.gameData.startTimeUTC);
  let hour = time.getHours();
  let ampm = hour >= 12 ? 'PM' : 'AM';

  hour = '' + ((hour + 11) % 12 + 1);

  let minute = '' + time.getMinutes();
  if (minute.length < 2) 
        minute = '0' + minute;

  let zone = moment.tz(moment.tz.guess()).format("z");

  time = hour + ":" + minute + " " + ampm + " " + zone;

  if(status === 1) {
    element = (<Col xs={6}> <h5>{time}</h5> </Col>)
  } else if(status === 2) {
    if(isHalf) {
      element = (<Col xs={6}>  
                  <h5>Halftime</h5>
                </Col>)
    } else if(isEndOfPeriod) {
      element = (<Col xs={6}>  
                  <h5>End of {game.gameData.period.current}Q</h5>
                </Col>)
    } else {
      element = (<Col xs={6}>  
                  <h5>{game.gameData.period.current}Q - {game.gameData.clock}</h5>
                </Col>)
    }
  } else if(status === 3) {
    element = (<Col xs={6}> <h5>Final</h5> </Col>)
  } else {

  }

  return (
    <Row className="game-time-container">
      <Col></Col>
      {element}
      <Col></Col>
    </Row>
  )
}

export default GameComponent;