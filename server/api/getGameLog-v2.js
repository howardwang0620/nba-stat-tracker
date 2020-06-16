var mysql = require('mysql');
var config = require('./db-config.js');

module.exports = function(req, res) {
	var playerId = req.query.playerId;
	var year = req.query.year;
	
	var conn = mysql.createConnection({
		host: config.mysqlDB.host,
		user: config.mysqlDB.user,
		password: config.mysqlDB.password,
		db: config.mysqlDB.db
	})

	conn.connect(function(err) {
		if(err) throw err;
		console.log("Connected")
	})

	var sql = `SELECT * FROM \`${config.mysqlDB.db}\`.\`${playerId}\``
	console.log(sql)

	conn.query(sql, function (err, result) {
		if (err) {
			console.log(err);
            res.send({ success: false, message: 'query error', error: err });
            return;
		}
		console.log("Query successful");
		result = result.reverse();
		// result = result.slice(0, Math.min(result.length, NUMBER_OF_GAMES))
		conn.end();
		res.send({ success: true, message: 'successful query', gamelog: result});
	});
}