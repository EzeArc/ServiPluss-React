package serviplus.sp_back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import serviplus.sp_back.entity.Admin;
import serviplus.sp_back.entity.Client;
import serviplus.sp_back.enums.Role;
import serviplus.sp_back.repository.AdminRepository;
import serviplus.sp_back.repository.ClientRepository;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements IAdminService {

    private final PasswordEncoder passwordEncoder;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    AdminRepository adminRepository;

    @Override
    public Admin getAdmin(String id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public List<Admin> listAllAdmin() {
        return adminRepository.findAll();
    }

    @Override
    @Transactional
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    @Transactional
    public Admin updateAdmin(Admin adminDB, Admin adminReceived) {
        if (adminDB == null) {
            return null;
        }
        adminDB.setName(adminReceived.getName());
        adminDB.setMail(adminReceived.getMail());
        adminDB.setAddress(adminReceived.getAddress());
        adminDB.setPhone(adminReceived.getPhone());
        adminDB.setImage(adminReceived.getImage());
        adminDB.setPassword(passwordEncoder.encode(adminReceived.getPassword()));
        return adminRepository.save(adminDB);
    }

    @Override
    @Transactional
    public Admin updateAdminStatus(String id) {
        Admin adminDB = getAdmin(id);
        if (adminDB == null) {
            return null;
        }
        adminDB.setState(true);
        return adminRepository.save(adminDB);
    }

    @Override
    @Transactional
    public Admin changeRoleToAdmin(String id) {
        Client clientDB = clientRepository.findById(id).orElse(null);
        Admin adminDB = adminRepository.findById(id).orElse(null);
        if (adminDB == null) {
            adminDB = new Admin();
            adminDB.setId(clientDB.getId());
            adminDB.setMail(clientDB.getMail());
            adminDB.setRol(Role.ADMIN);
            return adminRepository.save(adminDB);
        } else {
            adminDB.setRol(Role.ADMIN);
            return adminRepository.save(adminDB);
        }
    }
}
