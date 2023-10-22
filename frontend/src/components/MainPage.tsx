import { useEffect } from "react";
import axios from 'axios';

//http://127.0.0.1:5000/getOverview
function MainPage(props: any) {
    let overviewData

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getOverview',{
          params: {
            level: 'high school',
            topic: 'java',
            number: '5'
          }
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          if( err.response ){
            console.log(err.response.data);
          }
        });
    }, []);

  return (
    <div>
        <h1>Here is a overview of your topic..</h1>
        <p>{overviewData}</p>
    </div>
  );
}

export default MainPage;
