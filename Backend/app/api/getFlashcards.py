from flask import request, jsonify
from shared.generateFlashcards import generateFlashcards

def flashcards_routes(app):

    @app.route('/getFlashcards', methods=['GET'])
    def get_flashcards_endpoint():
        level = request.args.get('level')
        topic = request.args.get('topic')
        number = int(request.args.get('number'))

        response = generateFlashcards(level, topic, number)
        return jsonify(response)
