import { useState } from 'react'

import {serverURL} from '../constants'
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

function CustomChip({topSearchItems, searchValue,setSearchValue}){


    
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
