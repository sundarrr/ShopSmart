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
    private String productName;
    private String productPrice;
    private String productDescription;


    public Product(String name, String productPrice, String productDescription) {
        this.productName = name;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
    }
}
