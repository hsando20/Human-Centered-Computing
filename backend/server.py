# Import our server utility functions
import server_utils

# import the Flask class from the flask module
from flask import Flask, render_template, redirect, url_for
from markupsafe import escape
from flask import request



# create the application object
app = Flask(__name__)

# Home page that displays all the games
@app.route('/')
def home():
    return render_template(
        '/Code/index.html',
        get_game_data=server_utils.get_game_data) 

# Page for each game
@app.route('/games/<gameadress>')
def location(gameadress):
    server_utils.get_dame_database(gameadress)
    stars = server_utils.read_stars_csv(gameadress.split('.')[0])
    name_star_tuple = (stars, gameadress.split('.')[0])
    
    name_title_upper = (stars, gameadress.split('.')[0].capitalize())
    return render_template(
        '/Code/games/gametemplate.html',
        name_star_tuple=name_star_tuple , name_title_upper = name_title_upper , get_game_data=server_utils.get_game_data, stars = stars)
     # render a template


"""
Handle a new stars rating request
gameadress: The game html file passed in from url

returns the rendered html file for that game
"""
@app.route('/games/<gameadress>/star/' , methods = ['POST', 'GET'])
def ranking(gameadress):
    print(request.form['selection'])
    server_utils.update_stars_csv(request.form['selection'], gameadress.split('.')[0])
    return redirect("/games/"+gameadress.split('.')[0])


 ### This code is to be able to autofecth some html 
 ### Spiderman.HTML has the template for regular html 
 ### Everything else is empty 
 ### if you want to run regular html in the server use the following address
 ### address/noautofetch/gamename.html      
@app.route('/noautofetch/<game>' , methods = ['POST' , 'GET'])
def prueba(game):
    server_utils.get_dame_database(game)
    stars = server_utils.read_stars_csv(game.split('.')[0])
    name_star_tuple = (stars, game.split('.')[0])
    name_title_upper = (stars, game.split('.')[0].capitalize())
    return render_template('/Code/games/'+game , name_star_tuple=name_star_tuple , name_title_upper = name_title_upper , get_game_data=server_utils.get_game_data, stars = stars)      
        
@app.route('/paginaf/star/' , methods = ['POST' , 'GET'])
def prueba2():
    print(request.form['selection'])
    return redirect('/paginaf')

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)