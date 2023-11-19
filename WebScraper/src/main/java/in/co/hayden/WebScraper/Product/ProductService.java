package in.co.hayden.WebScraper.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.*;

@Service
public class ProductService {

    //    Inverted Index
    static class InvertedIndex {

        private Map<String, Set<Product>> index;

        public InvertedIndex() {
            index = new HashMap<>();
        }

        public void buildIndex(List<Product> productList) {
            for (Product product : productList) {
                String productName = product.getProductName().toLowerCase();

                // Split the product name into individual words (you might want to improve this based on your needs)
                String[] words = productName.split("\\s+");

                for (String word : words) {
                    index.putIfAbsent(word, new HashSet<>());
                    index.get(word).add(product);
                }
            }
        }

        public Set<Product> getProducts(String query) {
            return index.getOrDefault(query.toLowerCase(), new HashSet<>());
        }


    }

    //    Inverted Index end
    @Autowired
    private ProductRepository productRepository;

    public List<Product> allProduct(){
        return productRepository.findAll();
    }


    public List<Product> getProductsByName(String query){
        List<Product> productList = productRepository.findAll();// Add more products as needed
        InvertedIndex invertedIndex = new InvertedIndex();
        invertedIndex.buildIndex(productRepository.findAll());
        return List.copyOf(invertedIndex.getProducts(query));
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
        store.put("zehrs",0);
        store.put("metro",0);
        store.put("nofrills",0);
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
