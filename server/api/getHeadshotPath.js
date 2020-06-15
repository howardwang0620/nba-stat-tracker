const json = require('../../data/players.json');

module.exports = function(req, res) {
	const playerId = req.query.playerId;
	console.log(playerId)
	if(json[playerId]) {
		res.send({success: true, path: json[playerId]['headshotPath']})
	} else {
		res.send({success: false, path: "/images/headshots/unknown/blank.png"})
	}
	// console.log(JSON.stringify(json[playerId]['headshotPath']))
	// res.send(JSON.stringify(json[playerId]['headshotPath']))
}