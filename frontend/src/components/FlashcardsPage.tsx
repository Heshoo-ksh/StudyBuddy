import { useEffect, useState } from "react";
import axios from 'axios';
import '../css/flashcardsPage.css';
import { Card, CardContent, Container, Divider, Typography } from "@mui/material";

function FlashcardsPage(props: any) {
  const [flashcardsData, setFlashcardsData] = useState<Array<{ flashcardTitle: string, flashcardContent: string }>>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/getFlashcards', {

  params: {
    level: props.level,
    topic: props.prompt,
    number: props.numCards
  }
}).then((res) => {
        setFlashcardsData(res.data);
    }).catch((err) => {
        if (err.response) {
            console.log(err.response.data);
        }
    });

  }, [props.level, props.numCards, props.prompt]);

  const Flashcards = flashcardsData.map((obj) => 
    <div className="card-list-wrapper">
        <Card sx={{ maxWidth: 345 }} className={"card-wrapper"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {obj.flashcardTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {obj.flashcardContent}
                </Typography>
            </CardContent>
            <Divider light />
        </Card>
    </div>
  );

  return (
    <Container maxWidth="md" sx={{ boxShadow: 3 }}>
      <div>
        <Divider light />
        { Flashcards }
      </div>
    </Container>
  );
}

export default FlashcardsPage;
