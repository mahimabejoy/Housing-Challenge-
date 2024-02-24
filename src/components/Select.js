import SelectDataType from './SelectData/SelectDataType.js';
import Box from '@mui/material/Box';

const Select = ({
    cardData, statsCanData, mlsData, setCurrentData, setCardData}) => {
    return (
        <Box sx={{width: 1/4}}>
            <SelectDataType statsCanData={statsCanData} mlsData={mlsData} setCurrentData={setCurrentData}
                cardData={cardData} setCardData={setCardData}/>
        </Box>
           
    )
}
export default Select