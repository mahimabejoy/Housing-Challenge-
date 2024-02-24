import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



const SelectDataType = ({cardData, statsCanData, mlsData, setCurrentData, setCardData}) => {
    let displayDataType = cardData;
    const handleChange = (event) => {
        if (cardData.length > 1){
          displayDataType = []
          setCardData(displayDataType)}
        if (event.target.value === "StatsCan"){
          displayDataType[0] = "StatsCan"
          setCardData(displayDataType)
          setCurrentData(statsCanData)}
        if (event.target.value === "MLS"){
          displayDataType[0] = "MLS"
          setCardData(displayDataType)
          setCurrentData(mlsData)}
    }
    
    return (
          <div>
            <FormControl size="small" sx={{width: 8/10}}>
          <InputLabel id="select-data-label">Select Data</InputLabel>
          <Select labelId="select-data-label"
            id="data-select"
            defaultValue=""
            label="Data Type"
            onChange={handleChange}>
              <MenuItem value="">
              <em>None</em>
              </MenuItem>
              <MenuItem value={"StatsCan"}>StatsCan Data</MenuItem>
              <MenuItem value={"MLS"}>MLS HPI Data</MenuItem>
          </Select>
          </FormControl>
          </div>
     
    )
}
export default SelectDataType