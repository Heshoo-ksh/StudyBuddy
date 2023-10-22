import { useEffect } from "react";
import axios from 'axios';

//http://127.0.0.1:5000/getOverview
function MainPage(props: any) {
    let overviewData

    useEffect(() => {
        overviewData = axios.get('http://127.0.0.1:5000/getOverview').then((res) => {console.log(res)});
    }, []);

  return (
    <div>
        <h1>Here is a overview of your topic.</h1>
        <p>{overviewData}</p>
    </div>
  );
}

export default MainPage;
