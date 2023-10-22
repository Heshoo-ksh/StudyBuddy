import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

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
                "flashcardTitle": title,
                "flashcardContent": content
            }
            
            json_objects.append(json_object)

            i += 1  

        except IndexError:
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            i += 1  

    return json_objects

    
def generateFlashcards(level, topic, number):
    overview_text = generateFlashcardsWithOpenAI(topic, level, number)
    response = parse_overview_to_json(overview_text)
    return response