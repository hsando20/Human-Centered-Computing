# import the Flask class from the flask module
from flask import Flask, render_template
from markupsafe import escape


# create the application object
app = Flask(__name__)

# use decorators to link the function to a url
@app.route('/')
def home():
    return render_template('/Code/index.html')  # return a string
     
     
@app.route('/games/<gameadress>')
def minecraft(gameadress):
    return render_template('/Code/games/' + gameadress)
     # render a template


     # render a template
# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)