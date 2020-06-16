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
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";

// import DatePicker from '../Calendar/components/DatePicker';

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
        games: undefined,
        finished: false
      }
  }
  

  //time sensitive
  fetchGames() {
    console.log("fetch", this.state.date)
    fetch(`/api/getScoreBoard?date=${encodeURIComponent(this.state.date)}`)
    .then(res=> res.json())
    .then(result => {
      this.setState({
        games: result.games,
        finished: result.finished
      }, () => {
          if(!this.state.finished) this.timer = setTimeout(() => this.fetchGames(), 2000)
        }
      )
      // }, () => {
      //     this.timer = setTimeout(() => this.fetchGames(), 5000)
      //   }
      // )
    });
  }

  componentDidMount() {
    this.fetchGames();
    document.addEventListener("keydown", this.handleKeyPress, false);
  }   

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    clearTimeout(this.timer)
  }

  incrementDate() {
    this.setState((state) => {
      var d = state.date;
      d = moment(d, "YYYYMMDD").toDate();
      d.setDate(d.getDate() + 1);
      return {date: dateToString(d), games: undefined}
    }, () => this.fetchGames())
  }

  decrementDate() {
    this.setState((state) => {
      var d = state.date;
      d = moment(d, "YYYYMMDD").toDate();
      d.setDate(d.getDate() - 1);
      return {date: dateToString(d), games: undefined}
    }, () => this.fetchGames())
  }

  onDateChange = (d) => {
    this.setState({date: d}, this.fetchGames)
  }


  handleKeyPress = (e) => {
    //left arrow press
    if(this.state.games) {
      if(e.keyCode === 37) {
        clearTimeout(this.timer);
        this.decrementDate();
      }
      //right arrow press
      else if(e.keyCode === 39) {
        clearTimeout(this.timer);
        this.incrementDate();
      }
    }
  }

  renderRedirect = () => {
    return <Redirect to={{
      pathname: "/" + this.state.date,
      state: {
        date: this.state.date,
      }
    }}/>
  }

  //fill in GameComponent with state object, one game at a time
  render() {
    var rows = [];
    const date = this.state.date;

    var element;
    if(this.state.games) {
      if(this.state.games.length == 0) {
        element = (<div> No Games Listed</div>)
        rows.push(element);
      } else {
        this.state.games.forEach((obj, index) => {
          const gameObject = obj[Object.keys(obj)[0]];   
          const key = gameObject.gameData.gameId;
          
          const url = '/gamepage/' + date + '/' + key;
          element = <div key={key} className="hoverCard" onClick={() => this.props.history.push(url)}>
                      <GameComponent game={gameObject} date={date} type={TeamContainerEnum.GAME}/>
                    </div>
          rows.push(element);
        })
      }
    } else {
      element = (<div key="spinner" className="spinnerIcon">
                  <Spinner animation="border mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>)
      rows.push(element)
    }
    
    return (
      <div className="App">
        <div className="scoreBoardWrapper mx-auto">
          {this.renderRedirect()}
          <ScoreBoardNavBar date={this.state.date} />
          {rows}
        </div>
      </div>
    );
  }
}

const ScoreBoardNavBar = props => {
  var date = props.date;
  
  date = moment(date, 'YYYYMMDD').format("MM/DD/YYYY")

  return(
    <div className="scoreBoardNav mx-auto rounded-bottom">
      {date}
    </div>
  )

}

export default ScoreBoard;
