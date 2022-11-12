import csv
import requests
from igdb.wrapper import IGDBWrapper


"""
updates the stars csv with an added value of stars to the game given
stars: Number of stars to increment
game: string of the game to append to (has to already exist in the CSV)

returns nothing
"""
def update_stars_csv(stars, game):
    stars_dict = read_csv_data("stars.csv")
    stars_dict[game] = int(stars)

    write_csv_data("stars.csv", stars_dict)
    

"""
Get the stars value of a given game in the CSV File
game: The string of the game we want to read

return: the stars value from the csv
"""
def read_stars_csv(game):
    
    stars_dict = read_csv_data("stars.csv")
    return stars_dict[game]

"""
Reads all the games from the CSV and returns as a Dictionary
filepath: String filename of the CSV

return: Dictionary
"""
def read_csv_data(filepath):
    stars_dict = {}
    with open(filepath, newline='',mode='r') as csvfile:
        stars_entries = csv.reader(csvfile, delimiter=',')
        
        for row in stars_entries:
            stars_dict[row[0]] = int(row[1])
        print(stars_dict)
    return stars_dict

"""
Writes a Dictionary to a CSV
filepath: Filename of the csv
data_dict: dictionary containing the data to write

return: empty
"""
def write_csv_data(filepath, data_dict):
    with open('stars.csv', newline='', mode='w') as csvfile:
        stars_writer = csv.writer(csvfile, delimiter=',')
        
        for key, value in data_dict.items():
            stars_writer.writerow([key, value])

"""
returns a list containing the data of each game in the CSV
"""
def get_game_data():
    game_names = read_csv_data("stars.csv").keys()

    game_data = []

    for i in game_names:
        game_data.append({"name": i})
    return game_data

def get_dame_database(game_name):
        pass