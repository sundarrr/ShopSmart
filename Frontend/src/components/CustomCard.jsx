import { useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import {serverURL} from '../constants'

const isSmallScreen = window.innerWidth <= 600;
function CustomCard({incrementProductClickCount, index, productThumbnail, productName, productSellingPrice, productComparisonDetails, onButtonClick, productClickCount, dateScraped, productURL, fetchData}){

    
    return (<Card  style={isSmallScreen ? { width: '100%' }: { width: '33%' }}>
      <CardContent style={{ textAlign: 'center' }}>
        <img src={productThumbnail} alt="Product Thumbnail"  />
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
        <Button variant="contained" fullWidth onClick={() => incrementProductClickCount(index, productName, productURL)}>
          View :{productClickCount}
        </Button>
      </CardContent>
    </Card>);
}


export default CustomCard;
