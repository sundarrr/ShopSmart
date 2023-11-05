package in.co.hayden.WebScraper.Product;
import java.awt.PageAttributes.MediaType;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.rmi.ServerException;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;

@RestController
public class ProductController {
     @Autowired
     private ProductService productService;
    @PostMapping("/insertdata")
    public ResponseEntity<Product> addProductsToDatabase(@RequestBody Product[] products) {

        for(Product p: products)
        {
            productService.insertProduct(p);
            System.out.println(p);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

     @GetMapping("/")
     public ResponseEntity<List<Product>> getAllProducts(){
         return new ResponseEntity<List<Product>>(productService.allProduct(), HttpStatus.OK);
     }
    
    // @Autowired
    // private ProductService productService;
    // @GetMapping("/")
    // public ResponseEntity<List<Product>> test(){
    //     return new ResponseEntity<List<Product>>(productService.allProduct(), HttpStatus.OK);
    // }
    // @GetMapping("/view/{name}")
    // public ResponseEntity<Optional<Product>> singleProduct(@PathVariable("name") String name){
    //     return new ResponseEntity<Optional<Product>>(productService.findbyname(name), HttpStatus.OK);
    // }

    // @GetMapping("/insert/{name}")
    // public ResponseEntity<Product> insertData(@PathVariable("name") String name){
    //     return new ResponseEntity<Product>(productService.insertProduct(name), HttpStatus.CREATED);
    // }


    // @GetMapping("/deletes/{name}")
    // public ResponseEntity<Optional<Product>> deleteProduct(@PathVariable("name") String name){
    //     return new ResponseEntity<Optional<Product>>(productService.deleteProduct(name), HttpStatus.OK);
    // }

    // @GetMapping("/update/{name}/{newName}")
    // public ResponseEntity<Product> updateProduct(@PathVariable("name") String name, @PathVariable("newName") String newName){
    //     return new ResponseEntity<Product>(productService.updateProductName(name, newName), HttpStatus.OK);
    // }


}

