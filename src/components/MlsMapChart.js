import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import Tooltip from '@mui/material/Tooltip';
import sortBy from "lodash/sortBy";
import Box from '@mui/material/Box';
const MlsRegions = ({tooltipContent, setTooltipContent, mlsData, cardData, setCardData}) => {
  const colorScale = scaleLinear().domain([259400, 1350900]).range(['#99ff33', '#cc3300'])
  
  const createCard = (region, composite) => {
    let displayCityPrice = cardData;
    if (cardData.length < 3){
      displayCityPrice.push(region, composite)
      setCardData(displayCityPrice)}
    else{
      displayCityPrice[1] = region;
      displayCityPrice[2] = composite;
      setCardData(displayCityPrice)}
    }

    return (
      <div style={{display: 'flex', justifyContent: 'right'}}>
      <Box sx={{
          width: '75vw',
          border: '1px solid grey'}}>
      <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
        <ZoomableGroup center={[-100, 60]} zoom={4} maxZoom={18}>
        <Geographies geography={mlsData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Tooltip title={tooltipContent}>
                <Geography
                  style={{
                    default: {
                      outline: 'none'},
                    hover: {
                        outline: 'none'},
                    pressed: {
                        outline: 'none'}}}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.region}`)}}
                  onMouseLeave={() => {
                    setTooltipContent("")}} 
                  onClick={() => {
                    createCard(geo.properties.region, geo.properties.Composite)
                  }}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(geo.properties.Composite)}
                  stroke="#000000"
                  strokeWidth={0.05}/>
            </Tooltip>
            ))
          }
        </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      </Box>
      </div>
    );
  };
export default MlsRegions