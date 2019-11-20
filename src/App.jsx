import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import GameComponent from './GameComponent.jsx'
import DateComponent from './DateComponent.jsx'
import { dateToString } from './functions.jsx'

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
class App extends React.Component {
  constructor(props) {
    super(props);
    
    let d = dateToString(new Date());
    // d = new Date('November 18 2019')
    // d.setTime(d.getTime() - 21*60*1000);
    // let d;
    if(this.props.location.state) d = this.props.location.state.date
    else d = this.props.match.params.date

    this.state = {
        date: d,
        games: [],
        redirect: false
      }
  }
  

  //time sensitive
  fetchGames() {
    // var url = "/api/getDailyGames"
    let d = new Date();
    if(this.state.date === d.toDateString()) {
      this.setState({date: d})
    }
    fetch(`/api/getDailyGames?date=${encodeURIComponent(this.state.date)}`)
    .then(res=>res.json())
    .then(result => {
      // console.log(result);

      this.setState({
        games: result
      });
    });
  }
  
  // componentWillMount() {
  //   this.fetchGames();
  // }

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
      let d = state.date;
      d = moment(d, "YYYYMMDD").toDate();
      d.setDate(d.getDate() + 1);
      return {date: dateToString(d), redirect: true}
    }, () => this.fetchGames())
  }

  decrementDate() {
    this.setState((state) => {
      let d = state.date;
      d = moment(d, "YYYYMMDD").toDate();
      d.setDate(d.getDate() - 1);
      // console.log(d)
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

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("************UPDATING************")
  //   console.log("S: " + prevState.redirect)
  //   console.log("P: " + prevProps.location.state.redirect)
  //   if(prevProps.location.state.redirect) {
  //     this.setState((state) => {
  //       return {redirect: false}
  //     }, () => {
  //       clearInterval(this.interval)
  //       this.interval = setInterval(()=>this.fetchGames(), 5000);
  //     })
  //   }

  //   console.log("F: " + this.state.redirect)
  // }

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
    
    let date = this.state.date;
    console.log("************RENDERING************")
    console.log("R: " + this.state.redirect)
    this.state.games.forEach((obj, index) => {
      let gameObject = obj[Object.keys(obj)[0]];   
      let key = gameObject.gameData.gameId;
      let period = gameObject.gameData.period.current;

      let url = '/gamepage/' + date + '/' + key;
      let element = <div key={key} className="gameComponentWrapper hoverCard" onClick={() => this.props.history.push(url)}>
                  <GameComponent game={gameObject} date={date}/>
                </div>
      rows.push(element);
    })
    
    return (
      <div className="App">
        <div className="wrapper mx-auto">
          {this.renderRedirect()}
          {rows}
        </div>
      </div>
    );
  }
}

export default App;
