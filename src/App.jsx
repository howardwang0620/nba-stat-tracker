import React from 'react';
// import logo from './logo.svg';
import './App.css';
import GameComponent from './GameComponent.jsx'
import { dateToString } from './functions.jsx'

import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image";

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

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
class App extends React.Component {
  constructor(props) {
    super(props);

    let d = new Date();
    // d = new Date('November 18 2019')
    // d.setTime(d.getTime() - 21*60*1000);

    console.log(d);
    this.state = {
      date: d,
      games: []
    }
  }
  

  //time sensitive
  fetchGames() {
    // var url = "/api/getDailyGames"
    let d = new Date();
    if(this.state.date.toDateString() === d.toDateString()) {
      this.setState({date: d})
    }
    fetch(`/api/getDailyGames?date=${encodeURIComponent(dateToString(this.state.date))}`)
    .then(res=>res.json())
    .then(result => {
      console.log(result);

      this.setState({
        games: result
      });
    });
  }
  
  componentWillMount() {
    this.fetchGames();
  }

  componentDidMount() {
    // this.fetchGames();
    this.interval = setInterval(() => {
      this.fetchGames();
      // console.log("refresh")
    }, 5000);
  }   

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //fill in GameComponent with state object, one game at a time
  render() {
    const rows = [];
  
    let date = dateToString(this.state.date);

    let i = 0;
    while(i < this.state.games.length) {
      let gameObject = this.state.games[i][Object.keys(this.state.games[i])[0]];
      let key = gameObject.gameData.gameId;
      let period = gameObject.gameData.period.current;

      let url = '/gamepage/' + date + '/' + key;
      let element = <div key={key} className="gameComponentWrapper hoverCard" onClick={() => this.props.history.push(url)}>
                      <GameComponent game={gameObject} date={date}/>
                    </div>
      rows.push(element);
      i++;
    }

    // this.state.games.forEach(function(obj, index) {
    //   let gameObject = obj[Object.keys(obj)[0]];   
    //   let key = gameObject.gameData.gameId;
    //   let url = '/boxscore/' + date + '/' + key;
    //   let element = <div className="mx-auto wrapper" onClick={() => this.props.history.push(url)}>
    //                   <GameComponent key={key} game={gameObject} date={date}/>
    //                 </div>
    //   rows.push(element);
    // })

    return (
      <div className="App">
        <div className="wrapper mx-auto">
          {rows}
        </div>
      </div>
    );
  }
}

export default App;
