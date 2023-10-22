import { useEffect } from "react";
import axios from 'axios';
import '../css/flashcardsPage.css';
import { Card, CardContent, Container, Divider, Typography } from "@mui/material";

function FlashcardsPage(props: any) {
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getOverview',{
          params: {
            level: props.level,
            topic: props.prompt,
            number: props.numCards
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
            "flashcardContent": "Soccer, also known as football outside of North America, is a sport played between two teams of eleven players with a spherical ball. The goal is to score by getting the ball into the opposing team's net.",
            "flashcardTitle": "What is Soccer?"
        },
        {
            "flashcardContent": "A soccer field is rectangular in shape with two goals, one at each end. It is marked by sidelines, goal lines, a halfway line, and contains a center circle and penalty areas.",
            "flashcardTitle": "The Soccer Field"
        },
        {
            "flashcardContent": "Key positions include Forwards (They try to score), Midfielders (They help defend and attack), Defenders (They protect the goal), and the Goalkeeper (They guard the goal and try to stop the opponents from scoring).",
            "flashcardTitle": "Key Positions in Soccer"
        },
        {
            "flashcardContent": "Some basic rules are",
            "flashcardTitle": "Rules of Soccer"
        },
        {
            "flashcardContent": "Some popular soccer tournaments include the FIFA World Cup, the UEFA Champions League, and the English Premier League. These competitions gather the best teams from around the world.",
            "flashcardTitle": "Famous Soccer Tournaments"
        }
    ]

    const Flashcards = data.map((obj) => 
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
    )


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
