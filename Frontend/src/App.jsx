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

import TextField from '@mui/material/TextField';


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    try {
      if(searchValue != ""){
        
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchValue.toLowerCase())
        );
        console.log(filtered)
        setFilteredProducts(filtered);
      }
      else{
        setFilteredProducts(products);
      }
    } catch (error) {
      
    }
  }, [searchValue, products]);

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
        value={searchValue}
        onChange={handleSearchChange}
        // options={products.map(product => product.productName)}
        options={['eggs', 'apples', 'eggplant']}
        renderInput={(params) => (
          <TextField {...params} label="Search for a product..." />
        )}
      />
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
