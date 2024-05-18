package serviplus.sp_back.service;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import serviplus.sp_back.entity.Category;
import serviplus.sp_back.entity.CategoryDTO;
import serviplus.sp_back.entity.Provider;
import serviplus.sp_back.entity.ProviderDTO;
import serviplus.sp_back.repository.ProviderRepository;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl implements IProviderService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private ProviderRepository providerRepository;

    @Override
    public Provider getProvider(String id) {
        return providerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Provider> listAllProvider() {
        return providerRepository.findAll();
    }

    @Override
    @Transactional
    public Provider updateProvider(Provider providerDB, Provider providerReceived) {
        if (providerDB == null) {
            return null;
        }
        providerDB.setName(providerReceived.getName());
        providerDB.setMail(providerReceived.getMail());
        providerDB.setAddress(providerReceived.getAddress());
        providerDB.setPhone(providerReceived.getPhone());
        providerDB.setImage(providerReceived.getImage());
        providerDB.setPassword(passwordEncoder.encode(providerReceived.getPassword()));
        return providerRepository.save(providerDB);
    }

    @Override
    @Transactional
    public Provider updateProviderStatus(String id) {
        Provider providerDB = getProvider(id);
        if (providerDB == null) {
            return null;
        }
        providerDB.setState(true);
        return providerRepository.save(providerDB);
    }

    @Override
    public Long countBy() {
        return providerRepository.count();
    }

    @Override
    public List<Provider> listAllProviderActive() {
        return providerRepository.findByState(false);
    }

    public List<ProviderDTO> getAllProvidersWithImagesDTO() {
        List<Provider> providers = providerRepository.findAll();
        return providers.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ProviderDTO mapToDTO(Provider provider) {
        ProviderDTO.ProviderDTOBuilder dtoBuilder = ProviderDTO.builder()
                .id(provider.getId())
                .name(provider.getName())
                .salary(provider.getSalary())
                .rating(provider.getRating());

        if (provider.getImage() != null) {
            dtoBuilder.nameImage(provider.getImage().getName())
                    .mime(provider.getImage().getMime())
                    .content(provider.getImage().getContent());
        }

        if (provider.getCategory() != null) {
            Category category = provider.getCategory();
            CategoryDTO categoryDTO = CategoryDTO.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .build();

            if (category.getImage() != null) {
                categoryDTO.setNameImage(category.getImage().getName());
                categoryDTO.setMime(category.getImage().getMime());
                categoryDTO.setContent(category.getImage().getContent());
            }

            dtoBuilder.category(categoryDTO);
        }

        return dtoBuilder.build();
    }

}