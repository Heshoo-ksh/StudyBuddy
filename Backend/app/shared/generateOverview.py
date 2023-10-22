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
    lines = overview_text.strip().split("\n") 
    json_objects = []
    i = 0 

    while i < len(lines):  
        if len(lines[i].strip()) == 0: 
            i += 1
            continue

        try:
            title = lines[i].split(":")[1].strip(' "')
            i += 1

            content = lines[i].split(":")[1].strip()
            i += 1
          
            json_object = {
                "overviewTitle": title,
                "overviewContent": content
            }
            
            json_objects.append(json_object)

            i += 1 

        except IndexError:
            break  
        except Exception as e:
            print(f"An error occurred: {e}")
            i += 1  
    return json_objects


def generateContext(level, topic):
    overview_text = generateOverviewWithOpenAI(topic, level)
    response = parse_overview_to_json(overview_text)
    return response
