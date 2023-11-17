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
  const [editDistanceDidYouMean, setEditDistanceDidYouMean] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchDropDownOptions, setSearchDropDownOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateCommonWords, setUpdateCommonWords] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [topSearchItems, settopSearchItems] = useState([{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'},{searchTerm:'apples', count:'10'}]);

  // const serverURL = "https://webscraperbackend.hayden.co.in/";
  const serverURL = "http://localhost:8080/";
  const fetchData = async () => {
    try {
      const response = await fetch(serverURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data)
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

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

      // setUpdateCommonWords(productName)

      
    } catch (error) {
      console.error('Error incrementing search count:', error.message);
    }
  };

  async function updateSearchTerm(searchTerm){
    try {
      const response = await fetch(serverURL + 'searchCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchTerm),
      });

      // edit distance
      try {
        const response = await fetch(serverURL + 'wordchecker/' + searchTerm);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEditDistanceDidYouMean(data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      

      // try{
      //   await fetch(serverURL + 'insertSearchCount', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(searchTerm),
      //   });
      // }
      // catch{
      //   console.warn("error here")
      // }


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUpdateCommonWords(searchTerm)
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
        updateSearchTerm(searchValue);
        console.log("Filtered");
        console.log(filtered.length == 0);
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
        setSearchDropDownOptions(data)
      } catch (error) {
        setError(error);
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
      freeSolo
        style={{backgroundColor: 'white', margin:10}}
        value={searchValue}
        onChange={handleSearchChange}
        options={searchDropDownOptions.map(searchCount => searchCount.searchTerm.slice(0,1).toUpperCase() +  searchCount.searchTerm.slice(1, searchCount.searchTerm.length))}
        // options={['Eggs', 'Apples', 'Orange Juice', 'Tomato Ketchup', 'Vegetable Oil', 'Peanut Butter', 'Instant Noodles', 'Milk']}
        renderInput={(params) => (
          <TextField {...params} label="Search for a product..." />
        )}
      />

      <div style={{margin:10}}>
      
      {topSearchItems.map((searchedItem, index) =>
      <Chip 
      key={index}
      disabled = { searchValue && ( searchedItem.searchTerm.toLowerCase() == (searchValue.toLowerCase()))}
      avatar={<Avatar style={{backgroundColor: '#1976d2', color:'white'}}>{searchedItem.searchCount}</Avatar>}
      label={searchedItem.searchTerm} variant="outlined" onClick={()=> setSearchValue(searchedItem.searchTerm)} style={{margin:2, textTransform: 'capitalize' }}/>
      )}
      </div>
      <div style={{ display: 'flex', marginLeft: 20, color: 'red', alignItems:'center' }}>
      {editDistanceDidYouMean.length >0 ? <h4 style={{ margin: 0, cursor: 'pointer' }}>Did you mean ?</h4> : <></>}
      {editDistanceDidYouMean.length >0 && editDistanceDidYouMean.map((item) =>
            <a href="#" style={{ color: 'red', margin: 10, textDecoration: 'none' }} onClick={()=> setSearchValue(item)}>
            <h5 style={{ margin: 0, cursor: 'pointer', textDecoration: 'underline' }}>{item}</h5>
          </a>
          )}

    </div>
    <div  style={{ display:'flex',flexWrap: 'wrap'}}>
      {filteredProducts.length == 0 ? <h3 style={{color:"black", textAlign:'center', width:'100%'}}>Product Currently not available, please come back in an hour to find results</h3>: <></>}
      {filteredProducts.map((product, index) => (
        <CustomCard
        
          key={index}
          productName={product.productName}
          productSellingPrice={product.productSellingPrice}
          productComparisonDetails={product.productComparisonDetails}
          productThumbnail={product.productThumbnail}
          productURL={product.productURL}
          productClickCount = {product.productClickCount}
          onButtonClick={incrementProductClickCount}
          dateScraped = {product.id.date}
        />
      ))}
    </div>
    </>
  );

}

export default App;
