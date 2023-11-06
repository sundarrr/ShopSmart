import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CustomCard from './components/CustomCard'
import './App.css'
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import TextField from '@mui/material/TextField';


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateCommonWords, setUpdateCommonWords] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [topSearchItems, settopSearchItems] = useState([{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
        setProducts(data);
        setFilteredProducts(data)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function updateSearchTerm(searchTerm){
    try {
      const response = await fetch('http://localhost:8080/searchCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchTerm),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUpdateCommonWords(searchTerm)
      console.log('Search count incremented successfully!');
    } catch (error) {
      console.error('Error incrementing search count:', error.message);
    }
  }
  useEffect(() => {
    try {
      if(searchValue != ""){
        
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchValue.toLowerCase())
        );
        // console.log(filtered)
        updateSearchTerm(searchValue);
        setFilteredProducts(filtered);

      }
      else{
        setFilteredProducts(products);
      }
    } catch (error) {
      
    }
  }, [searchValue, products]);


  useEffect(() => {
    const getSearchTerms = async () => {
      try {
        const response = await fetch('http://localhost:8080/topSearchTerms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
        settopSearchItems(data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getSearchTerms();
  },[updateCommonWords])
  
  const handleSearchChange = (_, newValue) => {
    setSearchValue(newValue);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Autocomplete
        style={{backgroundColor: 'white', margin:10}}
        value={searchValue}
        onChange={handleSearchChange}
        // options={products.map(product => product.productName)}
        options={['Eggs', 'Apples', 'Orange Juice', 'Tomato Ketchup', 'Vegetable Oil', 'Peanut Butter', 'Instant Noodles', 'Milk']}
        renderInput={(params) => (
          <TextField {...params} label="Search for a product..." />
        )}
      />

      <div style={{margin:10}}>
  
      {topSearchItems.filter(product =>
            !(product.searchTerm.toLowerCase() == (searchValue.toLowerCase()))
        ).map((searchedItem) =>
      <Chip 
      avatar={<Avatar style={{backgroundColor: '#1976d2', color:'white'}}>{searchedItem.searchCount}</Avatar>}
      label={searchedItem.searchTerm} variant="outlined" onClick={()=> setSearchValue(searchedItem.searchTerm)} style={{margin:2, textTransform: 'capitalize' }}/>
      )}
      
      </div>
    <div  style={{ display:'flex',flexWrap: 'wrap'}}>
      {filteredProducts.map((product) => (
        <CustomCard
          key={product.id.timestamp + product.id.productName}
          productName={product.productName}
          productSellingPrice={product.productSellingPrice}
          productComparisonDetails={product.productComparisonDetails}
          productThumbnail={product.productThumbnail}
          productURL={product.productURL}
        />
      ))}
    </div>
    </>
  );

}

export default App;
