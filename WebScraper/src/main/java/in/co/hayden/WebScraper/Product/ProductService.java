package in.co.hayden.WebScraper.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.TreeMap;

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

        System.out.println(name);
        Product temp = productRepository.findFirstByProductName(name);
        temp.setProductClickCount(temp.productClickCount + 1);
        return productRepository.save(temp);
    }
    
    // Method to extract the store name from the URL
    private String extractStoreName(String url, String product) {
        if (url.contains("zehrs") && url.contains(product)) {
            return "zehrs";
        } else if (url.contains("metro")  && url.contains(product)) {
            return "metro";
        } else if (url.contains("nofrills")  && url.contains(product)) {
            return "nofrills";
        } else {
            return null; // Return null if the URL doesn't match any of the specified stores and product
        }
    }
    
    public TreeMap<String, Integer> processUrls(List<String> urls,String product) {
        // TreeMap to store key-value pairs (String -> Integer)
        TreeMap<String, Integer> store = new TreeMap<>();

        // Loop through the URLs
        for (String url : urls) {
            // Extract the store name and product type (e.g., "eggs") from the URL
            String storeName = extractStoreName(url,product.toLowerCase());
            if (storeName != null) {
//            	System.out.println(storeName);
                store.put(storeName, store.getOrDefault(storeName, 0) + 1);
            }
        }

        return store;
    }
}
