const json = require('../../data/players.json');

module.exports = function(req, res) {
	const playerId = req.query.playerId;
	console.log(playerId)
	res.send(JSON.stringify(json[playerId]['headshotPath']))
}