
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const geoUrl = 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson'

const StatsCanMapChart = ({ 
  setTooltipContent, tooltipContent, cardData, setCardData, currentData}) => {

  const colorScale = scaleLinear().domain([300, 2200]).range(['#c5ff33', '#cc3300'])

  const createCard = (city, rent, mortgage) => {
    let displayCityPrice = cardData;
    if (cardData.length < 2){
      if (mortgage){
      displayCityPrice.push(city, rent, mortgage)
      setCardData(displayCityPrice)}
    }
    else if (cardData.length === 3){
      displayCityPrice[1] = city;
      displayCityPrice[2] = rent;
      displayCityPrice.push(mortgage)
      setCardData(displayCityPrice)
    }
    else if (!mortgage){
      displayCityPrice[1] = city;
      displayCityPrice[2] = rent;
      displayCityPrice[3] = "None"
      setCardData(displayCityPrice)
    }
    else{
      displayCityPrice[1] = city;
      displayCityPrice[2] = rent;
      displayCityPrice[3] = mortgage
      setCardData(displayCityPrice)}
    }
 
  return (
    <div style={{display: 'flex', justifyContent: 'right'}}>
    <Box sx={{
        width: '75vw',
        border: '1px solid grey',
      }}>
    <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
      <ZoomableGroup center={[-100, 60]} zoom={4} maxZoom={18}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography 
              style={{
              default: {
                  outline: 'none'},
              hover: {
                  outline: 'none'},
              pressed: {
                  outline: 'none'}}}
          key={geo.rsmKey}
          geography={geo}
          fill="#DDD"/>
          ))
        }
      </Geographies>
      {currentData ? currentData.map(({ city, lng, lat, rent, mortgage }) => {
        return (
          <Tooltip title={tooltipContent}>
          <Marker 
            key={city}
            coordinates={[lng, lat]} 
            onMouseEnter={() => {
              setTooltipContent(`${city}`);
            }}
            onClick={() => {
              createCard(city, rent, mortgage)
            }}
            onMouseLeave={() => {
              setTooltipContent("");
            }}>
            <circle fill={'#000000'}
              stroke={colorScale(rent)}
              strokeWidth={0.35}
              r={0.25}
              opacity={1}/>
          </Marker>
          </Tooltip>
        );
      }) : <div></div>}
      </ZoomableGroup>
    </ComposableMap>
    </Box>
    </div>
  );
};

export default StatsCanMapChart;

