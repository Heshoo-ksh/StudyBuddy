import openai
import os
#openai.api_key = os.environ.get('OPENAI_API_KEY')

openai.api_key = os.getenv("OPENAI_API_KEY")
def generateOverview(subjectName, gradeLevel):
    system_msg = "You are trained to provide brief topic overviews tailored to different grade levels. Use the user's provided topic and grade level to generate concise yet informative overviews. Only If necessary, divide the topic into a few relevant subtopics for clarity."
    user_msg = f"Provide a concise overview of {subjectName} suitable for a {gradeLevel} level student. Present each as: 'Topic-name: a good title for the overview' 'brief description: the brief overview'."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ]
    )

    return {"context": response.choices[0].message['content']}

def generateContext(level, topic, number):
    response = generateOverview(topic, level)
    return response
