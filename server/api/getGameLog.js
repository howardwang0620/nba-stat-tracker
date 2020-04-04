const stats = require('nba.js').stats;
const data = require('nba.js').data;

module.exports = function(req, res) {
	var year = req.query.year;
	var playerId = req.query.playerId;
	
	//retrieve game log of player
	data.playerGamelog({
		year: year,
		personId: playerId
	}).then((json) => {
		//games object holds return object from gamelog api call
		var games = json['league']['standard'];
		
		//grab full boxscore stats for each game log game
		var promises = games.map(function(game, i) {
			var gameId = game['gameId'];
			var date = game['gameDateUTC'];
			date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);

			return new Promise((resolve, reject) => {
				data.boxscore({gameId: gameId, date: date})
				.then((json) => resolve(json), (err) => reject(err));
			})
		})
		
		var gameLog = [];
		//extract player statline from each boxscore object
		Promise.all(promises).then(function(values) {
			values.map(function(game, i) {
				//game object holds return JSON from boxscore api call
				var gameObj = {};
				var team, oppTeam;
				if(games[i]['isHomeGame'].toString() == 'true') {
					team = game['basicGameData']['hTeam'];
					oppTeam = game['basicGameData']['vTeam'];
				} else {
					team = game['basicGameData']['vTeam'];
					oppTeam = game['basicGameData']['hTeam'];
				}
				
				gameObj['gameId'] = game['basicGameData']['gameId']
				gameObj['date'] = game['basicGameData']['homeStartDate']
				gameObj['isHomeGame'] = games[i]['isHomeGame']
				gameObj['opponentTeam'] = oppTeam['triCode'];
				gameObj['opponentScore'] = oppTeam['score'];
				gameObj['teamScore'] = team['score'];

				var players = game['stats']['activePlayers'];
				gameObj['stats'] = players.filter((p) => {
					if(p['personId'] === playerId) {
						return p;
					}
				})[0];

				gameLog[i] = gameObj;
			})

			res.send(JSON.stringify(gameLog));
		})
	}, (err) => {
		console.log(err)
		res.send(JSON.stringify(err));
	})
}