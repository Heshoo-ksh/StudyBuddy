from flask import Blueprint, request, jsonify
from shared.openAIFunctions import generateContext

overview = Blueprint('overview', __name__)

@overview.route('/getOverview', methods=['GET'])
def get_overview_endpoint():
    data = request.get_json()
    level = data.get('level')
    topic = data.get('topic')
    number = data.get('number')

    response = generateContext(level, topic, number)
    return jsonify(response)
