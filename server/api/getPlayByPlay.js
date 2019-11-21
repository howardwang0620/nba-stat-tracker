const data = require('nba.js').data;
const json = require('../../data/teams.json');

//PLAY BY PLAY: ONLY RETURN THE LAST 5 PLAYS
/*
Event Types:
	1: Made shot
	2: Missed shot
	3: Free throws
	4: Rebound
	5: Turnover
	6: Foul
	8: Substitution
	9: Challenge play
	12: Start of period
	18: Instant Replay
*/
module.exports = function(req, res) {
	const date = req.query.date;
	const gameId = req.query.id;
	const period = req.query.period;

	data.pbp({date: date, gameId: gameId, period: period}).then((data) => {
		// console.log(JSON.stringify(data));
		res.send(JSON.stringify(data));
	})
}