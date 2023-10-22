from flask import request, jsonify
from shared.generateMultipuleChoiceQuiz import generateMultipleChoiceQuiz

def multiChoiceQuiz_routes(app):

    @app.route('/getMultiChoiceQuiz', methods=['GET'])
    def get_multiChoiceQuiz_routes():
        level = request.args.get('level')

        response = generateMultipleChoiceQuiz(level)
        return jsonify(response)
