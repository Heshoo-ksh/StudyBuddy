import openai
import os
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

def save_to_json(data, filename="flashcards.json"):
    with open(filename, 'w') as f: 
        json.dump(data, f)

def generateFlashcardsWithOpenAI(subjectName, gradeLevel, number):
    system_msg = ("You are trained to create educational flashcards tailored to different "
                  "grade levels. Use the user's provided topic and grade level to create concise "
                  "yet informative flashcards. Keep the number of flashcards to the specified limit.")
    user_msg = (f"Create {number} flashcards about {subjectName} suitable for a {gradeLevel} "
                "level student. Format each flashcard as: 'Flashcard-title: a good title' "
                "'Flashcard-content: brief information'.")

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ]
    )

    return response.choices[0].message['content']
    
def parse_flashcards_to_json(overview_text):
    lines = overview_text.split("\n")
    json_objects = []

    for i in range(0, len(lines), 3):
        if len(lines[i]) == 0:
            continue
        
        title = lines[i].split(":")[1].strip(' "')
        content = lines[i+1].split(":")[1].strip()

        json_object = {
            "flashcardTitle": title,
            "flashcardContent": content
        }
        json_objects.append(json_object)

    return json_objects
    
def generateFlashcards(level, topic, number):
    overview_text = generateFlashcardsWithOpenAI(topic, level, number)
    response = parse_flashcards_to_json(overview_text)
    save_to_json(response)
    return response