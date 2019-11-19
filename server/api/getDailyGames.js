const data = require('nba.js').data;
const json = require('../../data/teams.json');


//returns general data about all games in given date
module.exports = function(req, res) {
	var date = req.query.date;
	// date = "20191114"
	
	data.scoreboard({date: date}).then(function(data) {
		console.log(data)
		//update json value
		var numberOfGames = data['numGames'];
	    var gamesObject = data['games'];

	    // console.log(JSON.stringify(gamesObject));

	    let active = [];
	    let inactive = [];
		let finished = [];

	    //Key will be game number
	    for (var key of Object.keys(gamesObject)) {
			var gameObject = gamesObject[key];
			var gameID = gameObject['gameId'];
			var statusNum = gameObject['statusNum'];
			var game;
			

			var clockTime = 0;

			var hTeam = gameObject['hTeam'];
			hTeam['alternateLogo'] = json[hTeam['teamId']]['AlternateLogo'];
			hTeam['primaryColor'] = json[hTeam['teamId']]['PrimaryColor'];

			var vTeam = gameObject['vTeam'];
			vTeam['alternateLogo'] = json[vTeam['teamId']]['AlternateLogo'];
			vTeam['primaryColor'] = json[vTeam['teamId']]['PrimaryColor'];
			
			delete gameObject['hTeam'];
			delete gameObject['vTeam'];

			//create 3 elements in object
			var game = {};
			game[gameID] = {
				gameData: gameObject,
				homeTeam: hTeam,
				awayTeam: vTeam
			}

			switch(statusNum) {
				case 1:
			    	//Game is inactive, hasnt started
					inactive.push(game);
			    	break;
			  	case 2:
				    //Game is active
				    active.push(game);
				    break;
				case 3:
					//Game is finished
					finished.push(game);
					break;
				default:
					console.log("STATUS NUMBER ERROR")
					console.log(statusNum);
					break;
			}
	    }

	    //active -> yet to start -> finished
	    var games = active.concat(inactive.concat(finished));
	    // console.log(games)
		res.send(JSON.stringify(games));
		
	}, function(err) {
		console.log(err);
	});
}