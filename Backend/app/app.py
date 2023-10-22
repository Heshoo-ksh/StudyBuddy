from flask import Flask
from api.getOverview import overview_routes
from api.getFlashcards import flashcards_routes
from api.getMultiChoiceQuiz import multiChoiceQuiz_routes

app = Flask(__name__)
overview_routes(app)
flashcards_routes(app)
multiChoiceQuiz_routes(app)
if __name__ == '__main__':
    app.run(debug=True)
