package in.co.hayden.WebScraper.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Document(collection = "product")
public class Product {
    @Id
    private ObjectId id;
    private String name;

    public Product(String name) {
        this.name = name;
    }
}
