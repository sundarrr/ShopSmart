package in.co.hayden.WebScraper.SearchCount;

import in.co.hayden.WebScraper.Product.Product;
import in.co.hayden.WebScraper.Product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SearchCountService {
    @Autowired
    private SearchCountRepository searchCountRepository;

    public List<SearchCount> allSearchCounts(){
        return searchCountRepository.findAll();
    }

    public SearchCount insertSearchCount(String searchTerm){
        SearchCount s = new SearchCount();
        s.searchCount = 1;
        s.searchTerm = searchTerm;
        searchCountRepository.insert(s);
        return s;
    }

//    public Optional<SearchCount> checkIfSearchTermExist(String name){
//        return searchCountRepository.findSearchCountBySearchTerm(name).get();
//    }

}
