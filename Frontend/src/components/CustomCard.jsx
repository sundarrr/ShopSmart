import { useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import {serverURL} from '../constants'


function CustomCard({productThumbnail, productName, productSellingPrice, productComparisonDetails, onButtonClick, productClickCount, dateScraped, productURL, fetchData}){
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
    
    return (<Card  style={{ width: '33%' }}>
      <CardContent>
        <img src={productThumbnail} alt="Product Thumbnail" style={{ maxWidth: '100%' }} />
        <Typography variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Selling Price: {productSellingPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comparison Details: {productComparisonDetails}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          Comparison Details: {dateScraped}
        </Typography>
        <Button variant="contained" fullWidth onClick={() => incrementProductClickCount(productName, productURL)}>
          View :{productClickCount}
        </Button>
      </CardContent>
    </Card>);
}


export default CustomCard;
