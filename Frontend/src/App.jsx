import { useState, useEffect } from 'react'

import CustomCard from './components/CustomCard'
import './App.css'
import _ from 'lodash';


import {serverURL} from './constants'
import CustomChip from './components/CustomChip';
import CompanyStats from './components/CompanyStats'

function App() {
  const [editDistanceDidYouMean, setEditDistanceDidYouMean] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // search component
  const [finalSearchValue, setFinalSearchValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const isSmallScreen = window.innerWidth <= 600;

  const fetchFilteredProducts = async (searchTerm) => {
    try {
      const response = await fetch(serverURL + "getProductsByName/" + searchTerm);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {

    }
  };


const incrementProductClickCount = async (index, productName, productURL) => {
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
    const temp = [...filteredProducts];
    temp[index].productClickCount += 1;
    setFilteredProducts(temp)
    // fetchData();
    
  } catch (error) {
    console.error('Error incrementing search count:', error.message);
  }
};

  // Get all products data and set it to products and filtered products (to show all products  in the start)
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


  const handleDidYouMeanClick = (suggestion) => {
    // Set the selected suggestion as the query
    setFinalSearchValue(suggestion);
    // Clear suggestions
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion as the query
    setFinalSearchValue(suggestion);
    // Clear suggestions
    setSuggestions([]);
  };

  // called everytime user searches something or products array changes
  // Adds search term to SearchCounts Table
  // Uses edit distance to find similar words
  async function onEveryValidSearch(searchTerm){
    if (searchTerm == ""){
      setFilteredProducts(products);
      return
    }
    
      fetchFilteredProducts(searchTerm.toLowerCase())

    try {
      // edit distance
      try {
        const response = await fetch(serverURL + 'wordchecker/' + searchTerm);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEditDistanceDidYouMean(data)
        if (data.length != 0){
          // console.log("Not valid search");
          // console.log(data)
          return
        }
      } catch (error) {

      }

      const response = await fetch(serverURL + 'searchCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchTerm.toLowerCase()),
      });


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error incrementing search count:', error.message);
    }
  }



  // called everytime user searches something or products array changes
  useEffect(() => {
    setSearchValue(finalSearchValue)
    onEveryValidSearch(finalSearchValue);
  }, [finalSearchValue]);


  const fetchSuggestions = async (value) => {
    try {
      const response = await fetch(serverURL + 'getSearchSuggestions/' + value);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuggestions(data);

    } catch (error) {

    }
  };

  const fetchSuggestionsDebounced = _.debounce((inputValue) => {
    fetchSuggestions(inputValue.toLowerCase());
  }, 800);

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    fetchFilteredProducts(inputValue)
    if(inputValue != "")
    {
      fetchSuggestionsDebounced(inputValue.toLowerCase())
    }
    else{
      setSuggestions([])
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setFinalSearchValue(searchValue)
      fetchSuggestionsDebounced.cancel()
      setSuggestions([]);
    }
  };


  return (
    <>
  <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '10h',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            color:"black"
          }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              position: 'absolute',
              top: '100%',
              left: '0',
              width: '100%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              background: '#fff',
              zIndex: '100',
              borderRadius: '5px',
              color:' black'
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

      <div style={{margin:10}}>
      
      <CustomChip finalSearchValue= {finalSearchValue} setFinalSearchValue={setFinalSearchValue}></CustomChip>
      </div>
      <div style={{ display: 'flex', marginLeft: 20, color: 'red', alignItems:'center' }}>
      {editDistanceDidYouMean.length >0 ? <h4 style={{ margin: 0, cursor: 'pointer' }}>Did you mean ?</h4> : <></>}
      {editDistanceDidYouMean.length >0 && editDistanceDidYouMean.map((item) =>
            <a href="#" style={{  margin: 10, textDecoration: 'none' }} onClick={()=> handleDidYouMeanClick(item)}>
            <h5 style={{color: 'dark-blue', margin: 0, cursor: 'pointer', textDecoration: 'underline' }}>{item}</h5>
          </a>
          )}
    </div>
    <div style={{  flexGrow:1}}>

    <CompanyStats finalSearchValue={finalSearchValue}></CompanyStats>
    </div>
    <div  style={{...{ display:'flex',flexWrap: 'wrap'},...{ flexDirection: isSmallScreen ? 'column' : 'row'}}}>
      {filteredProducts.length == 0 ? <h3 style={{color:"black", textAlign:'center', width:'100%'}}>Product Currently not available, please come back in an hour to find results</h3>: <></>}
      {filteredProducts.slice(0, 100).map((product, index) => (
        <CustomCard
          incrementProductClickCount={incrementProductClickCount}
          key={index}
          index={index}
          productName={product.productName}
          productSellingPrice={product.productSellingPrice}
          productComparisonDetails={product.productComparisonDetails}
          productThumbnail={product.productThumbnail}
          productURL={product.productURL}
          productClickCount = {product.productClickCount}
          fetchData={fetchData}
          dateScraped = {product.id.date}
        />
      ))}
    </div>
    </>
  );

}

export default App;
