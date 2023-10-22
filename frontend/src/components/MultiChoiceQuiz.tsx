import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, CircularProgress, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import '../css/multiChoiceQuiz.css';

function FlashcardsPage(props: any) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:5000/getMultiChoiceQuiz', {
          params: {
            level: props.level
          }
        }).then((res) => {
            setIsLoading(false);
          setData(res.data);
        }).catch((err) => {
          if( err.response ){
            console.log(err.response.data);
          }
        });
    }, [props.level, props.numCards, props.prompt]);

   

    const [value, setValue] = useState('');
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);
    const [curQuestionIndx, setCurQuestionIndx] = useState(0);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [answers, setAnswers] = useState(new Array(data.length + 1));

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        answers[curQuestionIndx] = value;

        if (curQuestionIndx < answers.length) {
            setCurQuestionIndx(curQuestionIndx + 1);
        }
    };

    const Questions = data.map((obj:any) => 
        <div className="question-wrapper">
                <FormLabel id="radio-buttons-group-label">{obj.question}</FormLabel>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleRadioChange}
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
        for (let i = 0; i < data.length; i++) {
            if (answers[i + 1] === data[i]['correct_answer']) {
                setNumCorrect(numCorrect + 1);
            }
            else {
                setNumIncorrect(numIncorrect + 1);
            }
        }
        
        console.log(answers);
        console.log(numCorrect + " - " + numIncorrect);

        setIsQuizSubmitted(true);
    };


    return (
        <>
        {(isLoading) ? 
            (<Container maxWidth="md" sx={{ boxShadow: 3 }}>
            <h1>Loading Quiz...</h1>
            <CircularProgress color="secondary" />
            </Container>) : 
            (<Container maxWidth="xs" sx={{ boxShadow: 3 }}>
            <h1>Multiple Choice Quiz</h1>
            <Divider light />
            {!isQuizSubmitted && 
            <form onSubmit={handleSubmit}>
                <FormControl>
                    { Questions }
                    <FormHelperText>Take your time with the quiz :)</FormHelperText>
                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                        Submit
                    </Button>
                </FormControl>
            </form>
            }
            {isQuizSubmitted &&
            <div>
                <p>Thank you for taking the quiz!</p>
                <p>Your score is {(numCorrect / (numCorrect + numIncorrect)) * 100}% :^)</p>
            </div>
            }
        </Container>) }
        </>
    );
}

export default FlashcardsPage;
