import React from 'react';
import { Redirect } from 'react-router-dom';

import './ScoreBoard.css';

import GameComponent from '../Components/GameComponent.jsx'
import DateComponent from '../Components/DateComponent.jsx'
import { dateToString } from '../functions.jsx'
import { TeamContainerEnum } from '../enums.js'

import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image";

import moment from 'moment'

/*
  structure of GAMES object will look like:
    games: {
      gameID {
        gameData: {
        },
        homeTeam: {
        },
        awayTeam: {
        }
      },

      gameID2 {
      },..
    }

    DATE element will always be date element
*/
class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    
    var d = dateToString(new Date());
    // d = new Date('November 18 2019')
    // d.setTime(d.getTime() - 21*60*1000);
    // let d;
    if(this.props.location.state) d = this.props.location.state.date
    else d = this.props.match.params.date

    this.state = {
        date: d,
        games: [],
        finished: false,
        redirect: false
      }
  }
  

  //time sensitive
  fetchGames() {
    const d = new Date();
    if(this.state.date === d.toDateString()) {
      this.setState({date: d})
    }
    fetch(`/api/getScoreBoard?date=${encodeURIComponent(this.state.date)}`)
    .then(res=>res.json())
    .then(result => {
      // console.log(result);

      this.setState({
        games: result.games,
        finished: result.finished
      });
    });
  }

  componentDidMount() {
    this.fetchGames();
    document.addEventListener("keydown", this.handleKeyPress, false);
    // this.fetchGames();

    this.interval = setInterval(() => this.fetchGames(), 5000);
  }   

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    clearInterval(this.interval);
  }

  incrementDate() {
    this.setState((state) => {
      var d = state.date;
      d = moment(d, "YYYYMMDD").toDate();
      d.setDate(d.getDate() + 1);
      return {date: dateToString(d), redirect: true}
    }, () => this.fetchGames())
  }

  decrementDate() {
    this.setState((state) => {
      var d = state.date;
      d = moment(d, "YYYYMMDD").toDate();
      d.setDate(d.getDate() - 1);
      return {date: dateToString(d), redirect: true}
    }, () => this.fetchGames())
  }

  onDateChange = (d) => {
    this.setState({date: d}, this.fetchGames)
  }


  handleKeyPress = (e) => {
    //left arrow press
    if(e.keyCode === 37) {
      this.decrementDate();
    }
    //right arrow press
    else if(e.keyCode === 39) {
      this.incrementDate();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("************UPDATING************")
    prevState.redirect ? console.log("S: " + prevState.redirect) : console.log("S: undefined")
    prevProps.location.state ? console.log("P: " + prevProps.location.state.redirect) : console.log("P: undefined")
    if(prevProps.location.state && prevProps.location.state.redirect) {
      this.setState((state) => {
        return {redirect: false}
      }, () => {
        clearInterval(this.interval)
        this.interval = setInterval(() => this.fetchGames(), 5000);
      })
    }
    
    if(this.state.finished) clearInterval(this.interval)

    console.log("F: " + this.state.redirect)
  }

  renderRedirect = () => {
    console.log("RR: " + this.state.redirect)
    return <Redirect to={{
      pathname: "/" + this.state.date,
      state: {
        date: this.state.date,
        redirect: this.state.redirect
      }
    }}/>
  }

  //fill in GameComponent with state object, one game at a time
  render() {
    const rows = [];
    
    const date = this.state.date;
    console.log("************RENDERING************")
    console.log("R: " + this.state.redirect)
    this.state.games.forEach((obj, index) => {
      const gameObject = obj[Object.keys(obj)[0]];   
      const key = gameObject.gameData.gameId;
      
      const url = '/gamepage/' + date + '/' + key;
      const element = <div key={key} className="hoverCard" onClick={() => this.props.history.push(url)}>
                  <GameComponent game={gameObject} date={date} type={TeamContainerEnum.GAME}/>
                </div>
      rows.push(element);
    })
    
    return (
      <div className="App">
        <div className="scoreBoardWrapper mx-auto">
          {this.renderRedirect()}
          {rows}
        </div>
      </div>
    );
  }
}

export default ScoreBoard;
