import { useEffect, useState } from "react";
import axios from 'axios';
import '../css/mainPage.css';
import { CircularProgress, Container, Divider } from "@mui/material";

function MainPage(props: any) {
  const [overviewData, setOverviewData] = useState<Array<{ overviewTitle: string, overviewContent: string }>>([]); // Typed

  const [isLoading, setIsLoading] = useState(false);
        
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://127.0.0.1:5000/getOverview', {
    params: {
        level: props.level,
        topic: props.prompt
    }
    }).then((res) => {
        setIsLoading(false);

        setOverviewData(res.data);
    }).catch((err) => {
        if (err.response) {
            console.log(err.response.data);
        }
    });

  }, [props.level, props.numCards, props.prompt]);

  const Overview = overviewData.map((obj) =>
    <div>
      <h2>{obj.overviewTitle}</h2>
      <p>{obj.overviewContent}</p>
      <Divider light />
    </div>
  );

  return (
    <>
      {(isLoading) ? 
        (<Container maxWidth="md" sx={{ boxShadow: 3 }}>
          <h1>Loading Overview...</h1>
          <CircularProgress color="secondary" />
        </Container>) : 
        (<Container maxWidth="md" sx={{ boxShadow: 3 }}>
          <div className="mainPageWrapper">
            <h1>Here is an overview of your topic.</h1>
            <Divider light />
            { Overview }
          </div>
        </Container>) }
    </>
  );
}

export default MainPage;
