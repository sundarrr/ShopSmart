import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';


const isSmallScreen = window.innerWidth <= 600;
function CustomCard({bestDeal, incrementProductClickCount, index, productThumbnail, productName, productSellingPrice, productComparisonDetails, onButtonClick, productClickCount, dateScraped, productURL, fetchData}){

    const getCardStyle = () => {
      let style = isSmallScreen ? { width: '100%'}: { width: '32%', margin:'10px' }
      console.log(bestDeal)
      if(bestDeal){
        style.boxShadow = '0 0 20px rgba(173, 216, 230, 0.9)'
      }
      return style
    }
    
    return (
      
    <Card  style={getCardStyle()} className='bestdeal'>
      {bestDeal ?
      <div className='slant-line'></div>
      :<></>
      }

      <CardContent style={{ textAlign: 'center' }}>
        {/* {bestDeal ?
                <Typography variant="h5" component="div" style={{backgroundColor:'red'}}>
                Best Deal
              </Typography>
              :
              <></>} */}
        <img src={productThumbnail} alt="Product Thumbnail"  />
        <Typography variant="h5" component="div">
          {productName.split("-")[1]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Selling Price: {productSellingPrice}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          Date: {dateScraped}
        </Typography>
        <Button variant="contained" fullWidth onClick={() => incrementProductClickCount(index, productName, productURL)}>
          View :{productClickCount}
        </Button>
      </CardContent>
    </Card>);
}


export default CustomCard;
