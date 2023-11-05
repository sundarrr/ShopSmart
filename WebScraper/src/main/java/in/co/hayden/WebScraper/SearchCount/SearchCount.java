package in.co.hayden.WebScraper.SearchCount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Document(collection = "searchcounts")
public class SearchCount {
    @Id
    private ObjectId id;
    String searchTerm;
    int searchCount;
}
