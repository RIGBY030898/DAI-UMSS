package dai.app.model.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class BookRequest {
    @NotBlank(message = "El nombre del libro no puede estar vacío.")
    private String name;
    @Min(value = 1, message = "El precio mínimo del libro debe ser de 1.")
    private int price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
