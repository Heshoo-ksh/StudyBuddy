import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import '../css/multiChoiceQuiz.css';

function FlashcardsPage(props: any) {
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getOverview',{
          params: {
            level: props.level
          }
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          if( err.response ){
            console.log(err.response.data);
          }
        });
    }, [props.level, props.numCards, props.prompt]);

    // TEMP
    const data = [
        {
            "correct_answer": "b) Midfield",
            "options": {
                "a)": "Goal",
                "b)": "Midfield",
                "c)": "Jersey",
                "d)": "Offside"
            },
            "question": "What is the term for the center area of the soccer field?"
        },
        {
            "correct_answer": "c) To stop the opponents from scoring",
            "options": {
                "a)": "To score goals",
                "b)": "To link defense and attack",
                "c)": "To stop the opponents from scoring",
                "d)": "To protect the net"
            },
            "question": "What is the main function of defenders in a soccer team?"
        },
        {
            "correct_answer": "b) Tennis Racket",
            "options": {
                "a)": "Cleats",
                "b)": "Tennis Racket",
                "c)": "Shin Guards",
                "d)": "Soccer Ball"
            },
            "question": "Which of the following is not a piece of equipment required for a soccer game?"
        },
        {
            "correct_answer": "b) Offside",
            "options": {
                "a)": "Midfield",
                "b)": "Offside",
                "c)": "Forward",
                "d)": "Jersey"
            },
            "question": "What is the term for a player being positioned closer to the opponent's goal than both the ball and second-last opponent when the ball is played to them?"
        },
        {
            "correct_answer": "b) 11",
            "options": {
                "a)": "10",
                "b)": "11",
                "c)": "12",
                "d)": "13"
            },
            "question": "How many players are there in a soccer team?"
        }
    ]

    const [value, setValue] = useState('');
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);
    const answers: any = {};

    const handleRadioChange = (question: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        console.log(question + value);
        answers[question] = value;
    };

    const Questions = data.map((obj) => 
        <div className="question-wrapper">
                <FormLabel id="radio-buttons-group-label">{obj.question}</FormLabel>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={(e) => handleRadioChange(obj.question)}
                >
                    <FormControlLabel value={obj.options['a)']} control={<Radio />} label={obj.options['a)']} />
                    <FormControlLabel value={obj.options['b)']} control={<Radio />} label={obj.options['b)']} />
                    <FormControlLabel value={obj.options['c)']} control={<Radio />} label={obj.options['c)']} />
                    <FormControlLabel value={obj.options['d)']} control={<Radio />} label={obj.options['d)']} />
                </RadioGroup>
            <Divider light />
        </div>
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // validate answers
        for (let obj of data) {
            if (answers[obj.question] === obj.correct_answer) {
                setNumCorrect(numCorrect + 1);
            }
            else {
                setNumIncorrect(numIncorrect + 1);
            }
        }
        
        console.log(answers);
        console.log(numCorrect + " - " + numIncorrect);
    };


    return (
        <Container maxWidth="xs" sx={{ boxShadow: 3 }}>
            <h1>Multiple Choice Quiz</h1>
            <Divider light />
            <form onSubmit={handleSubmit}>
                <FormControl>
                    { Questions }
                    <FormHelperText>Take your time with the quiz :)</FormHelperText>
                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                        Submit
                    </Button>
                </FormControl>
            </form>
        </Container>
    );
}

export default FlashcardsPage;
