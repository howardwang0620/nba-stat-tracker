const express = require('express');
// const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(pino);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const getScoreBoard = require('./api/getScoreBoard.js')
const getBoxScore = require('./api/getBoxScore.js')
const getPlayByPlay = require('./api/getPlayByPlay.js')
const getGameLog = require('./api/getGameLog.js')
const getGameLogV2 = require('./api/getGameLog-v2.js')
const getHeadshotPath = require('./api/getHeadshotPath.js')


app.get('/api/getScoreBoard', getScoreBoard);
app.get('/api/getBoxScore', getBoxScore);
app.get('/api/getPlayByPlay', getPlayByPlay);
app.get('/api/getGameLog', getGameLog);
app.get('/api/getGameLog-v2', getGameLogV2);
app.get('/api/getHeadshotPath', getHeadshotPath);

app.listen(3001, () =>
  console.log('Express server is running on PORT:3001')
);
