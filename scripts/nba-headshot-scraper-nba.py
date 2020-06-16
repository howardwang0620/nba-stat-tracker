from bs4 import BeautifulSoup

import requests
from urllib.request import urlopen
import shutil
import os

def clear_headshot_directories():
	root = os.path.join(os.getcwd(), "../public/images/headshots/")
	root = os.path.normpath(root)

	teams = [f.path for f in os.scandir(root) if f.is_dir()]
	for dirs in teams:
		shutil.rmtree(dirs)

	print("...clearing done")


def get_teams():
	url = "https://www.nba.com/teams"

	response = requests.get(url)
	soup = BeautifulSoup(response.text, "html.parser")
	teams = soup.find_all("div", class_="team__list")

	for team in teams:
		href = team.findChildren('a', href=True)[0]
		name = href['href'].split("/")
		name = name[len(name) - 1]
		url = "https://www.nba.com" + href['href']

		download_headshots(name, url)

def download_headshots(teamName, url):
	path = os.path.join(os.getcwd(), "../public/images/headshots/" + teamName)
	path = os.path.normpath(path)

	try:
		os.mkdir(path)
	except OSError:
		print("error making directory: " + teamName)
	else:
		response = requests.get(url)
		soup = BeautifulSoup(response.text, "html.parser")
		players = soup.find_all("section", class_="nba-player-index__trending-item")
		image_info = []

		for player in players:
			name = player.find_all('a', class_=None)[0]['title']
			headshot = player.find('img', class_="lazyload")['data-src']

			image_info.append((name.replace(" ", ""), "https:" + headshot))
		
		for img in image_info:
			response = requests.get(img[1], stream=True)
			filename = path + "/" + img[0] + ".png"
			file = open(filename, 'wb')

			response.raw.decode_content = True
			shutil.copyfileobj(response.raw, file)
			del response

		print("directory success: " + teamName)

clear_headshot_directories()
get_teams()
