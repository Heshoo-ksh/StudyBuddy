from flask import request, jsonify
from shared.generateOverview import generateContext

def overview_routes(app):

    @app.route('/getOverview', methods=['GET'])
    def get_overview_endpoint():
        level = request.args.get('level')
        topic = request.args.get('topic')
        number = request.args.get('number')

        response = generateContext(level, topic, number)
        return jsonify(response)
