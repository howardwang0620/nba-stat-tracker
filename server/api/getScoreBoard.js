const data = require('nba.js').data;
const json = require('../../data/teams.json');

//returns general data about all games in given date
module.exports = function(req, res) {
	var date = req.query.date;
	
	data.scoreboard({date: date}).then(function(data) {
		//update json value
		var numberOfGames = data['numGames'];

		console.log("NUMBER OF GAMES*************: " + numberOfGames);
		// console.log(data)

	    var gamesObject = data['games'];

	    // console.log(JSON.stringify(gamesObject));

	    var active = [];
	    var inactive = [];
		var finished = [];

		var allInactive = true;

	    //Key will be game number
	    for (var key of Object.keys(gamesObject)) {
			var gameObject = gamesObject[key];
			const gameID = gameObject['gameId'];
			const statusNum = gameObject['statusNum'];
			var game;			

			var clockTime = 0;

			var hTeam = gameObject['hTeam'];

			//in the case that json file does not contain team
			if(json[hTeam['teamId']]) {
				hTeam['alternateLogo'] = json[hTeam['teamId']]['AlternateLogo'];
				hTeam['primaryColor'] = json[hTeam['teamId']]['PrimaryColor'];

			}
			
			//in the case that json file does not contain team
			var vTeam = gameObject['vTeam'];
			if(json[vTeam['teamId']]) {
				vTeam['alternateLogo'] = json[vTeam['teamId']]['AlternateLogo'];
				vTeam['primaryColor'] = json[vTeam['teamId']]['PrimaryColor'];
			}
			
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
				    allInactive = false;
				    active.push(game);
				    break;
				case 3:
					//Game is finished
					finished.push(game);
					break;
				default:
					allInactive = false;
					console.log("STATUS NUMBER ERROR")
					console.log(statusNum);
					break;
			}
	    }

	    //active games -> yet to start -> finished games
	    const games = active.concat(inactive.concat(finished));
	    // console.log(games)
		res.send(JSON.stringify({games : games, finished : allInactive}));
		
	}, function(err) {
		console.log(err);
	});
}