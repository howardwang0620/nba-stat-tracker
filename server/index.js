const express = require('express');
// const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(pino);


const getScoreBoard = require('./api/getScoreBoard.js')
const getBoxScore = require('./api/getBoxScore.js')
const getPlayByPlay = require('./api/getPlayByPlay.js')
const getGameLog = require('./api/getGameLog.js')
const getHeadshotPath = require('./api/getHeadshotPath.js')

app.get('/api/getScoreBoard', getScoreBoard);
app.get('/api/getBoxScore', getBoxScore);
app.get('/api/getPlayByPlay', getPlayByPlay);
app.get('/api/getGameLog', getGameLog);
app.get('/api/getHeadshotPath', getHeadshotPath);

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
