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
    public Product insertProduct(Product p){
        productRepository.insert(p);
        return p;
    }

    public Optional<Product> findbyname(String name){
         return productRepository.findProductByProductName(name);
    }

    public Optional<Product> deleteProduct(String name){
        return productRepository.deleteProductByProductName(name);
    }

    public Product updateProductName(String name, String newName){
    Product temp = productRepository.findProductByProductName(name).get();
    temp.setProductName(newName);
    return productRepository.save(temp);
    }
    public Product incrementSearchCount(String name){
        Product temp = productRepository.findFirstByProductName(name);
        temp.setProductClickCount(temp.productClickCount + 1);
        return productRepository.save(temp);
    }
}
