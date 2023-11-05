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
@Document(collection = "products")
public class Product {
    @Id
    private ObjectId id;
    String productName;
    String productSellingPrice;
    String productThumbnail;
    String productComparisonDetails;
    String productURL;

    public Product(String productName, String productSellingPrice, String productThumbnail, String productComparisonDetails, String productURL) {
        this.productName = productName;
        this.productSellingPrice = productSellingPrice;
        this.productThumbnail = productThumbnail;
        this.productComparisonDetails = productComparisonDetails;
        this.productURL = productURL;
    }
}
