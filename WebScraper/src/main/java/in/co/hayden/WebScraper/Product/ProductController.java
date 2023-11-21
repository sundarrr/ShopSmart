package in.co.hayden.WebScraper.Product;

import in.co.hayden.WebScraper.SearchCount.SearchCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;
import java.util.Set;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "https://webscraper.hayden.co.in/" })
public class ProductController {

    // Trie Start
    static final int NUM_OF_CHARS = 128;

    static class TrieNode {
        char data;
        TrieNode[] children = new TrieNode[NUM_OF_CHARS];
        boolean isEnd = false;

        // Constructor, Time O(1), Space O(1), 128 is constant
        TrieNode(char c) {
            data = c;
        }
    }

    static class Trie {
        TrieNode root = new TrieNode(' ');

        // Inserts a word into the trie, Iteration
        // Time O(s), Space O(s), s is word length
        void insert(String word) {
            TrieNode node = root;
            for (char ch : word.toCharArray()) {
                if (node.children[ch] == null)
                    node.children[ch] = new TrieNode(ch);
                node = node.children[ch];
            }
            node.isEnd = true;
        }

        // find the node with prefix's last char, then call helper to find all words
        // using recursion
        // Time O(n), Space O(n), n is number of nodes included(prefix and branches)
        List<String> autocomplete(String prefix) {
            TrieNode node = root;
            List<String> res = new ArrayList<String>();
            for (char ch : prefix.toCharArray()) {
                node = node.children[ch];
                if (node == null)
                    return new ArrayList<String>();
            }
            helper(node, res, prefix.substring(0, prefix.length() - 1));
            return res;
        }

        // recursion function called by autocomplete
        // Time O(n), Space O(n), n is number of nodes in branches
        void helper(TrieNode node, List<String> res, String prefix) {
            if (node == null) // base condition
                return;
            if (node.isEnd)
                res.add(prefix + node.data);
            for (TrieNode child : node.children)
                helper(child, res, prefix + node.data);
        }
    }
//Trie end
    @Autowired
    private ProductService productService;

    @Autowired
    private SearchCountService searchCountService;

    @PostMapping("/insertdata")
    public ResponseEntity<Product> addProductsToDatabase(@RequestBody Product[] products) {
        for (Product p : products) {
            productService.insertProduct(p);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/incrementproductclickcount")
    public ResponseEntity<Product> addProductsToDatabase(@RequestBody String productName) {
        // for(Product p: products)
        // {
        // productService.insertProduct(p);
        // }
        productService.incrementSearchCount(productName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProducts() {
        System.out.println(productService.allProduct().get(0).productClickCount);
       // productService.pageRank();
        return new ResponseEntity<List<Product>>(productService.pageRank(), HttpStatus.OK);
    }

    @GetMapping("/counturl/{fooditem}")
    public ResponseEntity<TreeMap<String, Integer>> getSystemUrlCount(@PathVariable String fooditem) {
        List<Product> p = productService.allProduct();
        List<String> urls = new ArrayList<>();
        for (Product products : p) {
            urls.add(products.productURL);
        }
        TreeMap<String, Integer> result = productService.processUrls(urls, fooditem);
        // System.out.println("Key-Value Pairs: " + result);

        return new ResponseEntity<TreeMap<String, Integer>>(result, HttpStatus.OK);
    }

    @GetMapping("/getSearchSuggestions/{input}")
    public ResponseEntity<List<String>> getSearchSuggestions(@PathVariable String input) {
        String filePath = "food_dictionary.txt";
        List<String> words = searchCountService.readFoodItemsFromFile(filePath);
        Trie t = new Trie();
        for (String w : words) {
            t.insert(w);
        }

        return new ResponseEntity<List<String>>(t.autocomplete(input), HttpStatus.OK);
    }
//    @GetMapping("/test/{input}")
//    public ResponseEntity<String> test(@PathVariable String input) {
//        // Sample list of products
//        List<Product> productList = productService.allProduct();// Add more products as needed
//
//
//        InvertedIndex invertedIndex = new InvertedIndex();
//        invertedIndex.buildIndex(productList);
//
//        // Search for products based on a query
//        Set<Product> laptopProducts = invertedIndex.getProducts("eggs");
//        Set<Product> smartphoneProducts = invertedIndex.getProducts("milk");
//
//        // Print the results
//        System.out.println("Products with 'laptop' in the name:");
//        laptopProducts.forEach(product -> System.out.println(product.getProductName()));
//
//        System.out.println("\nProducts with 'smartphone' in the name:");
//        smartphoneProducts.forEach(product -> System.out.println(product.getProductName()));
//
//        return new ResponseEntity<List<>>("ASf",HttpStatus.OK);
//    }

    @GetMapping("/getProductsByName/{input}")
    public ResponseEntity<List<Product>> getProductsByName(@PathVariable String input) {
        return new ResponseEntity<List<Product>>(productService.getProductsByName(input), HttpStatus.OK);
    }
}
