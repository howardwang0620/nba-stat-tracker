import requests
import json
import os

#load team json file
path = os.path.join(os.getcwd(), "../data/teams.json")
path = os.path.normpath(path)

with open(path) as f:
	teamCodes = json.load(f)


#assemble player.json from data.nba.net
response = requests.get("http://data.nba.net/prod/v1/2019/players.json")
data = response.json()['league']['standard']

output = {}

# team = teamCodes[data[0]['teamId']]['TeamName'].lower()
# playerName = data[0]['firstName'] + data[0]['lastName'] 
# path = os.path.join(os.getcwd(), "../headshots/" + team + "/" + playerName + ".png")
# print os.path.normpath(path)

for player in data:
	#get headshot path
	if(not player['teamId']):
		path = "/images/headshots/unknown/blank.png"
		fullTeamName = None
	else:
		team = teamCodes[player['teamId']]['TeamName'].lower()
		fullTeamName = teamCodes[player['teamId']]['TeamName']
		playerName = (player['firstName'] + player['lastName']).replace(" ", "").strip()
		print(playerName)
		path = "/images/headshots/" + team + "/" + playerName + ".png"
	#individual player json object
	output[player["personId"]] = {
		"firstName": player['firstName'].strip(),
		"lastName": player['lastName'].strip(),
		"teamCode": player['teamId'],
		"team": fullTeamName,
		"NBA_FullName": player['firstName'].strip() + " " + player['lastName'].strip(),
		"BBall-Ref_ID": "",
		"headshotPath": path
	}


path = os.path.join(os.getcwd(), "../data/players.json")
with open(path, 'w') as f:
	jsonStr = json.dumps(output, indent=4)
	f.write(jsonStr)

