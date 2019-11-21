const data = require('nba.js').data;
const json = require('../../data/teams.json');

//provides box score data for gameId game
module.exports = function(req, res) {

	const date = req.query.date;
	const gameId = req.query.id;
	
	data.boxscore({date: date, gameId: gameId}).then(function(data) {
		// console.log(data)
		

		var hTeam = data['basicGameData']['hTeam'];
		hTeam['fullName'] = json[hTeam['teamId']]['TeamFullName'];
		hTeam['primaryLogo'] = json[hTeam['teamId']]['PrimaryLogo'];
		hTeam['alternateLogo'] = json[hTeam['teamId']]['AlternateLogo'];

		hTeam['primaryColor'] = json[hTeam['teamId']]['PrimaryColor'];

		var vTeam = data['basicGameData']['vTeam'];
		vTeam['fullName'] = json[vTeam['teamId']]['TeamFullName'];
		vTeam['primaryLogo'] = json[vTeam['teamId']]['PrimaryLogo'];
		vTeam['alternateLogo'] = json[vTeam['teamId']]['AlternateLogo'];

		vTeam['primaryColor'] = json[vTeam['teamId']]['PrimaryColor'];
		
		delete data['basicGameData']['hTeam'];
		delete data['basicGameData']['vTeam'];


		console.log("******************GET BOXSCORE STARTED*************************")
		console.log(data)

		var stats = data['stats'];
		
		if(stats) {
			var hTeamId = hTeam['teamId'];
			var vTeamId = vTeam['teamId'];

			stats[hTeamId] = stats['hTeam'];
			stats[vTeamId] = stats['vTeam'];

			delete stats['hTeam'];
			delete stats['vTeam'];

			stats[hTeamId]['activePlayers'] = [];
			stats[vTeamId]['activePlayers'] = [];

			const activePlayers = stats['activePlayers'];
			
			// console.log(activePlayers);
			Object.keys(activePlayers).map(function(key, index) {
				const playerObj = activePlayers[key];
				if(playerObj['teamId'] === hTeamId) {
					stats[hTeamId]['activePlayers'].push(playerObj);
				} else if(playerObj['teamId'] === vTeamId) {
					stats[vTeamId]['activePlayers'].push(playerObj);
				}
			});

			delete stats['activePlayers'];
		}
				
		const boxScoreObject = {
			gameData: data['basicGameData'],
			homeTeam: hTeam,
			awayTeam: vTeam,
			stats: stats
		}
		
		console.log("******************BOXSCORE RETURN OBJECT*************************")

		console.log(boxScoreObject)

		res.send(JSON.stringify(boxScoreObject));
	}, function(err) {
		console.log(err);
	});

	// res.send({id: gameId, date: date});
}