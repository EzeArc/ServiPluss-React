package serviplus.sp_back.service;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import serviplus.sp_back.entity.Client;
import serviplus.sp_back.repository.ClientRepository;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements IClientService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client getClient(String id) {

        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Client> listAllClient() {
        return clientRepository.findAll();
    }

    @Override
    @Transactional
    public Client updateClient(Client clientDB, Client clientReceived) {
        try {
            if (clientDB == null) {
                throw new Exception("Client not found: " + clientDB);
            }
            clientDB.setName(clientReceived.getName());
            clientDB.setMail(clientReceived.getMail());
            clientDB.setAddress(clientReceived.getAddress());
            clientDB.setPhone(clientReceived.getPhone());
            clientDB.setImage(clientReceived.getImage());
            clientDB.setPassword(passwordEncoder.encode(clientReceived.getPassword()));
            return clientRepository.save(clientDB);
        } catch (Exception e) {
            throw new RuntimeException("Error updating client", e);
        }
    }

    @Override
    @Transactional
    public Client updateClientStatus(String id) {
        Client clientDB = getClient(id);
        if (clientDB == null) {
            return null;
        }
        clientDB.setState(true);
        return clientRepository.save(clientDB);
    }

    @Override
    public Long countBy() {
        return clientRepository.countBy();
    }

}
