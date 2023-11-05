package in.co.hayden.WebScraper.SearchCount;


import in.co.hayden.WebScraper.Product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SearchCountController {
    @Autowired
    private SearchCountService searchCountService;
    @PostMapping("/searchCount")
    public ResponseEntity<Product> incrementSearchCount(@RequestBody String searchTerm) {
        String searchTermWithoutQuotes = searchTerm.replace("\"", "");
        searchCountService.insertSearchCount(searchTermWithoutQuotes);
        System.out.println((searchTermWithoutQuotes));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
