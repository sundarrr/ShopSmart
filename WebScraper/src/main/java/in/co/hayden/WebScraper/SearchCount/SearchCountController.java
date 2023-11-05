package in.co.hayden.WebScraper.SearchCount;


import in.co.hayden.WebScraper.Product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SearchCountController {
    @Autowired
    private SearchCountService searchCountService;
    @PostMapping("/searchCount")
    public ResponseEntity<SearchCount> incrementSearchCount(@RequestBody String searchTerm) {
        String searchTermWithoutQuotes = searchTerm.replace("\"", "");
        searchCountService.insertSearchCount(searchTermWithoutQuotes);
        System.out.println((searchTermWithoutQuotes));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/topSearchTerms")
    public ResponseEntity<List<SearchCount>> incrementSearchCount() {
        return new ResponseEntity<>(searchCountService.topSearch(), HttpStatus.OK);

    }
}
