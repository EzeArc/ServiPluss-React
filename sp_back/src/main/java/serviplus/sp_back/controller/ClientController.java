package serviplus.sp_back.controller;

import java.util.List;

import serviplus.sp_back.entity.Category;
import serviplus.sp_back.entity.Client;
import serviplus.sp_back.entity.Job;
import serviplus.sp_back.entity.Provider;
import serviplus.sp_back.entity.ProviderDTO;
import serviplus.sp_back.service.CategoryServiceImpl;
import serviplus.sp_back.service.ClientServiceImpl;
import serviplus.sp_back.service.JobServiceImpl;
import serviplus.sp_back.service.ProviderServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/user")
@CrossOrigin(value = "http://localhost:5173")
public class ClientController {

    @Autowired
    private CategoryServiceImpl categoryServiceImpl;
    @Autowired
    private ClientServiceImpl clientServiceImpl;
    @Autowired
    private JobServiceImpl jobServiceImpl;
    @Autowired
    private ProviderServiceImpl providerServiceImpl;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryServiceImpl.listAllCategoryActive();
    }

    // @GetMapping("/listProvidersActive")
    // public List<Provider> listAllProviderActive() {
    // System.out.println("---------------------------");
    // System.out.println(providerServiceImpl.listAllProviderActive());
    // System.out.println("---------------------------");
    // return providerServiceImpl.listAllProviderActive();
    // }

    @GetMapping("/listProvidersActiveWithImages")
    public List<ProviderDTO> listProvidersWithImages() {
        return providerServiceImpl.getAllProvidersWithImagesDTO();
    }

    @GetMapping("/listJobsActive")
    public List<Job> listAllJobToCalificate() {
        return jobServiceImpl.listAllJobToCalificate();
    }

    @PostMapping("/createJobContract")
    public Job createJobContract(@RequestParam String idProvider, @RequestParam String idClient) {
        return jobServiceImpl.createJob(idProvider, idClient);
    }

    @PutMapping("/client/{id}")
    public Client updateClient(@PathVariable String id, @RequestBody Client clientReceived) {
        try {
            Client clientDB = clientServiceImpl.getClient(id);
            if (clientDB == null) {
                throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Client not found with id: " + id);
            }
            Client updatedClient = clientServiceImpl.updateClient(clientDB, clientReceived);
            return updatedClient;
        } catch (Exception e) {
            throw new RuntimeException("Error updating client: " + e.getMessage(), e);
        }
    }
}