package serviplus.sp_back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Provider extends Client {

    @NotNull(message = "Salary is requiered")
    private Double salary;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    private Double rating;

}
