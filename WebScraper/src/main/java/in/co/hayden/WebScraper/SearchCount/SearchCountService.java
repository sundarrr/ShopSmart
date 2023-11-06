package in.co.hayden.WebScraper.SearchCount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SearchCountService {
    @Autowired
    private SearchCountRepository searchCountRepository;

    public List<SearchCount> allSearchCounts(){
        List<SearchCount> searchCounts = searchCountRepository.findAll();
        return searchCountRepository.findAll();
    }

    public List<SearchCount> topSearch()
    {
        return searchCountRepository.findAll();
    }

    public SearchCount insertSearchCount(String searchTerm){
        Optional<SearchCount> existingSearchCountOptional = searchCountRepository.findBySearchTerm(searchTerm);
        if (existingSearchCountOptional.isPresent()) {
            // If the search term already exists, increment the search count
            SearchCount existingSearchCount = existingSearchCountOptional.get();
            existingSearchCount.setSearchCount(existingSearchCount.getSearchCount() + 1);
            return searchCountRepository.save(existingSearchCount);
        } else {
            // If the search term doesn't exist, insert a new search count with count 1
            SearchCount newSearchCount = new SearchCount();
            newSearchCount.setSearchTerm(searchTerm);
            newSearchCount.setSearchCount(1);
            return searchCountRepository.insert(newSearchCount);
        }

    }

//    public Optional<SearchCount> checkIfSearchTermExist(String name){
//        return searchCountRepository.findSearchCountBySearchTerm(name).get();
//    }

}
