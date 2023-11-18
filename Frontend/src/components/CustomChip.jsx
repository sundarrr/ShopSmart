import { useState, useEffect } from 'react'

import {serverURL} from '../constants'
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

function CustomChip({setFinalSearchValue, finalSearchValue}){
  // chip component
  const [updateCommonWords, setUpdateCommonWords] = useState(null);
  const [topSearchItems, settopSearchItems] = useState([{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'}]);



  useEffect(() => {
    const getSearchTerms = async () => {
      // For chip component
      try {
        const response = await fetch(serverURL + 'topSearchTerms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        settopSearchItems(data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      // for search drop down
      try {
        const response = await fetch(serverURL + 'allSearchCounts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // setSearchDropDownOptions(data)
      } catch (error) {
        setError(error);
      }
    };

    getSearchTerms();
  },[updateCommonWords])
  
    
    return (<>
    {topSearchItems.map((searchedItem, index) =>
      <Chip 
      key={index}
      disabled = { finalSearchValue && ( searchedItem.searchTerm.toLowerCase() == (finalSearchValue.toLowerCase()))}
      avatar={<Avatar style={{backgroundColor: '#1976d2', color:'white'}}>{searchedItem.searchCount}</Avatar>}
      label={searchedItem.searchTerm} variant="outlined" onClick={()=> {setFinalSearchValue(searchedItem.searchTerm); setUpdateCommonWords("asdf")}} style={{margin:2, textTransform: 'capitalize' }}/>
      )}
    </>);
}


export default CustomChip;
