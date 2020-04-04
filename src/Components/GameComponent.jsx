import React from 'react';
import TeamContainer from './TeamContainer.jsx'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ChangeHighlight from "react-change-highlight";

import { TeamContainerEnum } from '../enums.js'
import AdvancedTeamContainer from './AdvancedTeamContainer.jsx'

import moment from "moment-timezone";


/*

Takes (game, date) 
  -Game is an object with children: gameData, awayTeam, homeTeam
  -Date is a string in format: YYYYMMDD
  -Type defines type of GameComponent used (defined in enums.js)
*/
const GameComponent = props => {

	const game = props.game;
  const date = props.date;
  const type = props.type;

  const status = game.gameData.statusNum;
  const bgColor = game.homeTeam.primaryColor;

  const gameId = game.gameData.gameId;
  const scoreKey = game.awayTeam.score + game.homeTeam.score;
  const time = getGameTimeValue(game, status);
  // let timeKey = game.gameData.clock;
  
  if(type === TeamContainerEnum.GAME) {
    return (
      <div className="gameComponentWrapper rounded" style={{backgroundColor: bgColor}}>
        <div className="container-fluid">
          <TeamContainer key={gameId} gameData={game} time={time}/>
          <GameScoreContainer key={scoreKey} game={game} status={status}/>
          <GameTimeContainer time={time} />
        </div>
      </div>
    )
  } else if(type === TeamContainerEnum.ADVANCED_GAME) {
    return (
      <div className="advancedComponentWrapper rounded">
        <AdvancedTeamContainer gameData={game} time={time} />
      </div>

    )
  }
}
/*
<div className="advancedComponentWrapper rounded" style={{backgroundColor: bgColor}}>
        <AdvancedTeamContainer gameData={game} time={time} />
      </div>
*/

//displays score of game including quarter, shows time if game inactive
const GameScoreContainer = props => {
  const game = props.game;
  const status = props.status;
  const gameActivated = game.gameData.isGameActivated;
  var element;

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
      <ChangeHighlight showAfter={100} hideAfter={1500}>
        {element}
      </ChangeHighlight>
    </div>
    )
}

//status to see if game time should be displayed
/*
1 -> display: 4:00PM Eastern
2 -> display: 1Q - 12:00
3 -> display: FINAL
*/
function getGameTimeValue(_game, _status) {
  const game = _game;
  const status = _status;

  const isHalf = game.gameData.period.isHalftime;
  const isEndOfPeriod = game.gameData.period.isEndOfPeriod;
  
  var time = new Date(game.gameData.startTimeUTC);
  var hour = time.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = '' + ((hour + 11) % 12 + 1);

  var minute = '' + time.getMinutes();
  if (minute.length < 2) 
        minute = '0' + minute;

  let zone = moment.tz(moment.tz.guess()).format("z");

  time = hour + ":" + minute + " " + ampm + " " + zone;

  var element;
  if(status === 1) {
    element = time;
  } else if(status === 2) {
    if(isHalf) {
      element = "Halftime";
    } else if(isEndOfPeriod) {
      element = "End of " + game.gameData.period.current + "Q";
    } else {
      element = game.gameData.period.current + "Q - " + game.gameData.clock;
    }
  } else if(status === 3) {
    element = "Final"
  } else {

  }

  return element;
}

//pass in time value to display
const GameTimeContainer = props => {
  const time = props.time;

  return (
    <Row className="game-time-container">
      <Col></Col>
      <Col xs={6}>  
        <ChangeHighlight showAfter={100} hideAfter={1500}>
          <span style={{fontSize : props.textSize}}>
            {time}
          </span>
        </ChangeHighlight>
      </Col>  
      <Col></Col>
    </Row>
  )
}

export default GameComponent;
export { GameScoreContainer, GameTimeContainer};

