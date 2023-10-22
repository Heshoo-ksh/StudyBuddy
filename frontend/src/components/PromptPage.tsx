import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import '../css/promptPage.css';
import { useState } from "react";

function PromptPage(props: any) {
  const [cardAmnt, setCardAmnt] = useState('');
  const [prompt, setPrompt] = useState('');
  const [nextDisabled, setNextDisabled] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setCardAmnt(event.target.value as string);
  };

  const handleClick = () => {
    props.setShowPromptPage(false);
    props.setShowMainPage(true);
  }

  return (
    <div className="prompt-wrapper">
        <h1>Please enter a topic for your study buddy to make flashcards for you :)</h1>
        <div className="form-wrapper">
            <div className="text-wrapper">
                <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Please enter topic *"
                multiline
                rows={4}
                placeholder="Enter topic..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPrompt(event.target.value);
                }}
                />
            </div>
            <div className="select-wrapper">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="simple-select-label">Flash Cards *</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={cardAmnt}
                            label="Flashcard Amount"
                            onChange={handleChange}
                        >
                            <MenuItem value={5}>Five</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>                         
            </div>
            <Button 
            className="nextButton" 
            variant="contained" 
            disabled={cardAmnt == "" || prompt.trim() == ""} 
            color="success"
            onClick = {handleClick}
            >
                Next
            </Button>
        </div>
    </div>
  );
}

export default PromptPage;
