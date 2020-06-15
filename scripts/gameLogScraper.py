from nba_api.stats.endpoints import playergamelog
from nba_api.stats.static import teams
import mysql.connector
import datetime
import json
import os
import time

# pull players json to get all player ids
# iterate thru each id, finding game logs and inserting 
# into mysql db, where each table is playerID
# tables will essentially be game logs where
# each record inside table will contain game statistics

# schema: 
# 	table['playerid'] = 
# 		date(key) ... statistics
# upon iterating thru player ids, check if table exists
# 	if not create table and gather all game logs
# 	if exists, gather last game date and add games up to last game date

##FUNCTIONS
#formats date string into applicable sql DATE format
	#date: string value that is passed as MON DD, YYYY where MON is 3 letter month name (eg. JAN)
def formatDate(date):
	date = date.split()
	month = str(datetime.datetime.strptime(date[0], "%b").month).zfill(2)
	day = str(date[1][0:-1]).zfill(2)
	year = str(date[2])
	return year + "-" + month + "-" + day

#reduces API return value of matchup as (X vs. Y or X @ Y) to X/Y string
	#matchup: string value matchup in an X vs. Y or X @ Y format
def formatMatchup(matchup):
	if("vs" in matchup):
		return "/".join(matchup.split(" vs. "))
	else:
		return "@".join(matchup.split(" @ "))

#generates sql query for creating mySQL table
	#PLAYER_ID: id of player used as table name
def createTable(DB, PLAYER_ID):
	return (
		"CREATE TABLE `{db}`.`{playerid}` ("
		"`GAME_DATE` DATE NOT NULL,"
		"`SEASON_ID` VARCHAR(16) NOT NULL,"
		"`GAME_ID` VARCHAR(32) NOT NULL,"
		"`MATCHUP` VARCHAR(10) NOT NULL,"
		"`WL` TINYINT NOT NULL,"
		"`MIN` TINYINT NOT NULL,"
		"`FGM` TINYINT NOT NULL,"
		"`FGA` TINYINT NOT NULL,"
		"`FG3M` TINYINT NOT NULL,"
		"`FG3A` TINYINT NOT NULL,"
		"`FTM` TINYINT NOT NULL,"
		"`FTA` TINYINT NOT NULL,"
		"`OREB` TINYINT NOT NULL,"
		"`DREB` TINYINT NOT NULL,"
		"`REB` TINYINT NOT NULL,"
		"`AST` TINYINT NOT NULL,"
		"`STL` TINYINT NOT NULL,"
		"`BLK` TINYINT NOT NULL,"
		"`TOV` TINYINT NOT NULL,"
		"`PTS` TINYINT NOT NULL,"
		"`PLUS_MINUS` TINYINT NOT NULL,"
		"PRIMARY KEY (`GAME_DATE`));"
		).format(db=DB, playerid=PLAYER_ID)

#generates sql query for inserting record into mySQL table
	#DATA: Pandas dataframe row tuple containing game statistics
def insertRecord(DB, DATA):
	return (
		f"INSERT INTO `{DB}`.`{DATA.Player_ID}`(`GAME_DATE`, `SEASON_ID`, `GAME_ID`, `MATCHUP`, `WL`,"
		"`MIN`, `FGM`, `FGA`, `FG3M`, `FG3A`, `FTM`, `FTA`,"
		"`OREB`, `DREB`, `REB`, `AST`, `STL`, `BLK`, `TOV`, `PTS`, `PLUS_MINUS`)"
		f"VALUES ('{formatDate(DATA.GAME_DATE)}', '{DATA.SEASON_ID}', '{DATA.Game_ID}', '{formatMatchup(DATA.MATCHUP)}', '{1 if DATA.WL == 'W' else 0}',"
		f"'{DATA.MIN}', '{DATA.FGM}', '{DATA.FGA}', '{DATA.FG3M}', '{DATA.FG3A}', '{DATA.FTM}', '{DATA.FTA}',"
		f"'{DATA.OREB}', '{DATA.DREB}', '{DATA.REB}', '{DATA.AST}', '{DATA.STL}', '{DATA.BLK}', '{DATA.TOV}', '{DATA.PTS}', {DATA.PLUS_MINUS});"
	)


#Writes or updates player table to database
	#conn: connection to mysql server
	#db: name of database being written into
	#PLAYER_ID: ID of player to be committed
def commitPlayerToDB(conn, db, PLAYER_ID):
	#First check if mysql db contains player_id table
	cursor = conn.cursor();
	stmt = "SHOW TABLES LIKE '{}'".format(PLAYER_ID)
	cursor.execute(stmt)
	result = cursor.fetchone()

	#if table exists, add records to existing table (...IMPLEMENTING)
	if(result):
		print(PLAYER_ID, "table exists, no action taken")

	# if table does not exist, create table and insert entire game log
	else:
		print("Creating", PLAYER_ID, "table")
		cursor.execute(createTable(db, PLAYER_ID))
		print("Table successfully created")

		#gather game log for specific player_id player
		print("Gathering ", PLAYER_ID,"game log...")
		gamelog = playergamelog.PlayerGameLog(player_id=PLAYER_ID, season = '2019')
		df = gamelog.get_data_frames()[0]

		#insert games into table
		print("Inserting games...")
		for row in df.itertuples():
			cursor.execute(insertRecord(db, row))
			conn.commit()
			if(cursor.rowcount == 0):
				print("Error inserting game:", row.GAME_DATE)

		cursor.close()
		print("Finished creating table", PLAYER_ID)

#Connect to database
DB_NAME = "nba-stats"
conn = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  passwd="12345678",
  db=DB_NAME
)

#retrieve json file with all player ids
path = os.path.join(os.getcwd(), "../data/players.json")
path = os.path.normpath(path)

#load file into json obj
with open(path) as f:
	playerJSON = json.load(f)

# write players to tables
count = 0;
for PLAYER_ID in playerJSON:
	count+=1
	print("Player:" , playerJSON[PLAYER_ID]["NBA_FullName"], f"({PLAYER_ID})", f"({count}/{len(playerJSON)})")
	time.sleep(.3)
	commitPlayerToDB(conn, DB_NAME, PLAYER_ID)

conn.close()





















