var mysql = require('mysql');
const DB_NAME = "nba-stats";

module.exports = function(req, res) {
	var playerId = req.query.playerId;
	var year = req.query.year;
	
	var conn = mysql.createConnection({
		host: "127.0.0.1",
		user: "root",
		password: "1234"
	})

	conn.connect(function(err) {
		if(err) throw err;
		console.log("Connected")
	})

	var sql = `SELECT * FROM \`${DB_NAME}\`.\`${playerId}\``
	console.log(sql)

	conn.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Query successful");
		result = result.reverse();
		// result = result.slice(0, Math.min(result.length, NUMBER_OF_GAMES))
		conn.end();
		res.send(JSON.stringify(result));
	});
}