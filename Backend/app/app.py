from flask import Flask
from api.getOverview import overview_routes

app = Flask(__name__)
overview_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
