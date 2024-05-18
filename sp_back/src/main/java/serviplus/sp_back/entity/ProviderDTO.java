package serviplus.sp_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProviderDTO {
    private String id;
    private String name;
    private String nameImage;
    private String mime;
    private byte[] content;
    private CategoryDTO category;
    private Double rating;
    private Double salary;
}
