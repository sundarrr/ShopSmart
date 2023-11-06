package in.co.hayden.WebScraper.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://webscraper.hayden.co.in/"})
public class ProductController {
     @Autowired
     private ProductService productService;
    @PostMapping("/insertdata")
    public ResponseEntity<Product> addProductsToDatabase(@RequestBody Product[] products) {
        for(Product p: products)
        {
            productService.insertProduct(p);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PostMapping("/incrementproductclickcount")
    public ResponseEntity<Product> addProductsToDatabase(@RequestBody String productName) {
//        for(Product p: products)
//        {
//            productService.insertProduct(p);
//        }
        productService.incrementSearchCount(productName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

     @GetMapping("/")
     public ResponseEntity<List<Product>> getAllProducts(){
         return new ResponseEntity<List<Product>>(productService.allProduct(), HttpStatus.OK);
     }

}

