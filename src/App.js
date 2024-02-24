import { useState, useEffect } from 'react';
import StatsCanMapChart from './components/StatsCanMapChart'
import Grid from '@mui/material/Grid';
import DisplayCard from './components/CityDataCard';
import MlsMapChart from './components/MlsMapChart';
import Select from './components/Select.js'
import NavBar from './components/NavBar'

function App() {
  const [statsCanData, setStatsCanData] = useState([]);
  const [mlsData, setMlsData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [cardData, setCardData] = useState ([]);  
  const [tooltipContent, setTooltipContent] = useState("");
  

  useEffect(() => {
    fetch('https://housing-data-app.s3.us-west-2.amazonaws.com/StatsCanRentMotgage.json')
    .then(response => response.json())
    .then((city) => {setStatsCanData(city)})
  },[]);

  useEffect(() => {
    fetch('https://housing-data-app.s3.us-west-2.amazonaws.com/mlsHpiRegionsNameComposite+copy.json')
    .then(response => response.json())
    .then((mls) => {setMlsData(mls)})
  },[]);

  

  return (
    <div className="App">
      <NavBar/>
      <div style={{display: "flex", alignItems: "left"}}>
      <Select 
        statsCanData={statsCanData} mlsData={mlsData} setCurrentData={setCurrentData}
        cardData={cardData} setCardData={setCardData} />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {cardData[0] === "StatsCan" || !cardData[0] ? 
            <StatsCanMapChart 
              setTooltipContent={setTooltipContent} tooltipContent={tooltipContent}
              statsCanData={statsCanData} currentData={currentData} cardData={cardData} 
              setCardData={setCardData}/> :
            <MlsMapChart setTooltipContent={setTooltipContent} tooltipContent={tooltipContent} 
              cardData={cardData} setCardData={setCardData} mlsData={mlsData}/>}
        </Grid>
        <Grid item xs={4}>
          <DisplayCard cardData={cardData}/>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default App;
