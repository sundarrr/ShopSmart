import { useState } from 'react'

import {serverURL} from '../constants'
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

function CustomChip({topSearchItems, searchValue,setSearchValue}){

      // Called on clicking view button  (products array is recreated post this)
  const incrementProductClickCount = async (productName, productURL) => {
    window.open(productURL, '_blank');

    try {
      const response = await fetch(serverURL + 'incrementproductclickcount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:productName,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchData();
      
    } catch (error) {
      console.error('Error incrementing search count:', error.message);
    }
  };
    
    return (<>
    {topSearchItems.map((searchedItem, index) =>
      <Chip 
      key={index}
      disabled = { searchValue && ( searchedItem.searchTerm.toLowerCase() == (searchValue.toLowerCase()))}
      avatar={<Avatar style={{backgroundColor: '#1976d2', color:'white'}}>{searchedItem.searchCount}</Avatar>}
      label={searchedItem.searchTerm} variant="outlined" onClick={()=> setSearchValue(searchedItem.searchTerm)} style={{margin:2, textTransform: 'capitalize' }}/>
      )}
    </>);
}


export default CustomChip;
