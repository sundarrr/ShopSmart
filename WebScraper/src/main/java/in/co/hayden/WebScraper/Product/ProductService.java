package in.co.hayden.WebScraper.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> allProduct(){
        return productRepository.findAll();
    }
    public Product insertProduct(String name){
        Product newentry = new Product(name);
        productRepository.insert(newentry);
        return newentry;
    }

        public Optional<Product> findbyname(String name){
         return productRepository.findProductByName(name);
    }

    public Optional<Product> deleteProduct(String name){
        return productRepository.deleteProductByname(name);
    }

    public Product updateProductName(String name, String newName){
    Product temp = productRepository.findProductByName(name).get();
    temp.setName(newName);
    return productRepository.save(temp);
    }

}
