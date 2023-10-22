import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def generateOverviewWithOpenAI(subjectName, gradeLevel):

    system_msg = ("You are trained to provide brief topic overviews tailored to different "
                  "grade levels. Use the user's provided topic and grade level to generate concise "
                  "yet informative overviews. Only If necessary, divide the topic into a few relevant "
                  "subtopics for clarity. ( no more than 3), also make sure not inclue any extra [:] other than the one used after the header")
    user_msg = (f"Provide a concise overview of {subjectName} suitable for a {gradeLevel} "
                "level student. Present each as: 'Topic-name: a good title for the overview' "
                "'brief description: the brief overview'.")
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ]
    )

    return response.choices[0].message['content']

def parse_overview_to_json(overview_text):
    lines = overview_text.split("\n")
    json_objects = []

    for i in range(0, len(lines), 3):
        if len(lines[i]) == 0:
            continue
        
        title = lines[i].split(":")[1].strip(' "')
        content = lines[i+1].split(":")[1].strip()

        json_object = {
            "overviewTitle": title,
            "overviewContent": content
        }
        json_objects.append(json_object)

    return json_objects

def generateContext(level, topic):
    overview_text = generateOverviewWithOpenAI(topic, level)
    response = parse_overview_to_json(overview_text)
    return response
