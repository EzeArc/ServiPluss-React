package serviplus.sp_back.service;

import java.util.List;

import serviplus.sp_back.entity.Admin;

public interface IAdminService {
    public Admin getAdmin(String id);

    public List<Admin> listAllAdmin();

    public Admin changeRoleToAdmin(String id);

    public Admin createAdmin(Admin admin);

    public Admin updateAdmin(Admin adminDB, Admin adminReceived);

    public Admin updateAdminStatus(String id);
}
