import openai
import os
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

def load_flashcards_from_json(filename="flashcards.json"):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    else:
        return []  
 
def load__overview_from_json(filename="overview.json"):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    else:
        return []  
    
saved_flashcards = load_flashcards_from_json()
saved_overview = load__overview_from_json()

def generateMultipleChoiceQuizWithOpenAI(flashcards, overviews, gradeLevel):

    system_msg = ("You are trained to create multiple-choice quiz questions."
                  "one of which is the correct answer. Use the provided flashcards and overviews to "
                  "generate quiz questions suitable for a {gradeLevel} level student."
                  " Each question should be formatted as follows: 'Question: [Your Question]'. "
                "This should be followed by four options, each starting with 'a)' [option1], 'b)' [option2], 'c)' [option3], or 'd)' [option4] respectively. "
                "After listing the four options, specify the correct answer with 'Correct-answer: [letter of the correct option: the answer]'. "
                "Separate each question set with a blank line."
             )

    all_cards = flashcards + overviews

    user_msg = f"Create multiple-choice quiz questions based on the following information: {json.dumps(all_cards)}"

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ]
    )

    return response.choices[0].message['content']
  

def parse_quiz_to_json(quiz_text):
    lines = quiz_text.strip().split("\n") 
    json_objects = []
    i = 0

    while i < len(lines):
        if len(lines[i].strip()) == 0:  
            i += 1
            continue

        try:

            question = lines[i].split(":")[1].strip()
            i += 1

            options = {}
            for j in ['a)', 'b)', 'c)', 'd)']:  
                opt_text = lines[i].split(")")[1].strip()  
                options[j] = opt_text 
                i += 1

            answer = lines[i].split(":")[1].strip()
            i += 1

            json_object = {
                "question": question,
                "options": options, 
                "correct_answer": answer
            }

            json_objects.append(json_object)

        except IndexError:
            break 
        except Exception as e:
            print(f"An error occurred: {e}")
            i += 1 
    return json_objects



def generateMultipleChoiceQuiz(level):
    overview_text = generateMultipleChoiceQuizWithOpenAI(saved_flashcards, saved_overview, level)
    response = parse_quiz_to_json(overview_text)
    return response