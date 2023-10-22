import { useEffect } from "react";
import axios from 'axios';
import '../css/mainPage.css';
import { Container, Divider, Paper } from "@mui/material";

function MainPage(props: any) {
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getOverview',{
          params: {
            level: props.level,
            topic: props.prompt
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
          "overviewContent": "Soccer is a fun game that is loved by people all over the world! It is played with a round ball on a wide, green field. The main goal of soccer is to kick the ball into your opponent's net, which is called scoring a goal. There are two teams of eleven players each, including the goalkeeper who is the only player that can touch the ball with his/her hands but only within a certain area. Remember, teamwork, skills, and respecting others is very important in this game.",
          "overviewTitle": "Kicking Off with Soccer"
      },
      {
          "overviewContent": "In soccer, there are rules known as 'Laws of the Game' that we must follow. Players use their feet to kick the ball and are not allowed to use their hands, except for the goalkeeper. If a player breaks a rule, the other team gets a chance to kick the ball from the spot where the rule was broken, which is called a 'free kick'. There are two halves in a game and each half is usually 45 minutes long.",
          "overviewTitle": "The Rules of Soccer"
      },
      {
          "overviewContent": "Each player in a soccer team has a specific position, like being a goalie, a striker, a midfielder, or a defender. These positions are very important. For example, a striker is often the person who scores the goal, while the goalie tries to stop the other team from scoring. Each player, no matter their position, plays an important part in the game, making it a wonderful team sport.",
          "overviewTitle": "Positions in Soccer"
      }
  ]


  const Overview = data.map((obj) => 
    <div>
        <h2>{obj.overviewTitle}</h2>
        <p>{obj.overviewContent}</p>
        <Divider light />
    </div>
  )


  return (
    <Container maxWidth="md" sx={{ boxShadow: 3 }}>
      <div className="mainPageWrapper">
          <h1>Here is a overview of your topic.</h1>
          <Divider light />
          { Overview }
      </div>
    </Container>
  );
}

export default MainPage;
