import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import '../css/gradeLevelSelect.css';
import { useState } from "react";

function GradeLevelSelect(props: any) {
    const [nextDisabled, setNextDisabled] = useState(true);
    const [promptVal, setPromptVal] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPromptVal((event.target as HTMLInputElement).value);
        setNextDisabled(false);
    };

    const handleClick = () => {
        props.setShowGradeLevel(false);
        props.setShowPromptPage(true);
        props.setValue(promptVal);
    }

  return (
    <div className="gradeLevelSelect">
        <h1>Welcome!</h1>
        <FormControl>
            <FormLabel id="radio-buttons-group-label">Please Select Your Education Level: *</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleChange}
                className="radioGroup"
                >
                <FormControlLabel value="elementary" control={<Radio />} label="Elementary School" />
                <FormControlLabel value="intermediate" control={<Radio />} label="Middle School" />
                <FormControlLabel value="high school" control={<Radio />} label="High School" />
                <FormControlLabel value="college" control={<Radio />} label="College" />
            </RadioGroup>
        </FormControl>
        <Button 
        className="nextButton" 
        variant="contained" 
        disabled={nextDisabled} 
        color="success"
        onClick={handleClick}
        >
            Next
        </Button>
    </div>
  );
}

export default GradeLevelSelect;
