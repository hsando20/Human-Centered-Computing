# import the Flask class from the flask module
from flask import Flask, render_template
from markupsafe import escape
from flask import request
import csv


# create the application object
app = Flask(__name__)

# use decorators to link the function to a url
@app.route('/')
def home():
    return render_template('/Code/index.html')  # return a string
     
     
@app.route('/games/<gameadress>')
def location(gameadress):
    return render_template('/Code/games/' + gameadress , stars = read_stars_csv(gameadress.split('.')[0]))
     # render a template

"""
Handle a new stars rating request
gameadress: The game html file passed in from url

returns the rendered html file for that game
"""
@app.route('/games/<gameadress>/star/' , methods = ['POST', 'GET'])
def ranking(gameadress):
    print(request.form['stars'])
    update_stars_csv(request.form['stars'], gameadress.split('.')[0])
    return render_template('/Code/games/' + gameadress , stars = read_stars_csv(gameadress.split('.')[0]))
        

"""
updates the stars csv with an added value of stars to the game given
stars: Number of stars to increment
game: string of the game to append to (has to already exist in the CSV)

returns nothing
"""
def update_stars_csv(stars, game):
    stars_dict = {}
    with open('stars.csv', newline='',mode='r') as csvfile:
        stars_entries = csv.reader(csvfile, delimiter=',')
        for row in stars_entries:
            stars_dict[row[0]] = int(row[1])
        print(stars_dict)
    stars_dict[game] = int(stars)

    with open('stars.csv', newline='', mode='w') as csvfile:
        stars_writer = csv.writer(csvfile, delimiter=',')
        
        for key, value in stars_dict.items():
            stars_writer.writerow([key, value])

"""
Get the stars value of a given game in the CSV File
game: The string of the game we want to read

return: the stars value from the csv
"""
def read_stars_csv(game):
    
    stars_dict = {}
    with open('stars.csv', newline='',mode='r') as csvfile:
        stars_entries = csv.reader(csvfile, delimiter=',')
        
        for row in stars_entries:
            stars_dict[row[0]] = int(row[1])
        print(stars_dict)
    return stars_dict[game]


     # render a template
# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)