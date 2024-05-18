package serviplus.sp_back.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.var;
import serviplus.sp_back.entity.Admin;
import serviplus.sp_back.entity.Category;
import serviplus.sp_back.entity.Client;
import serviplus.sp_back.entity.Image;
import serviplus.sp_back.entity.Provider;
import serviplus.sp_back.enums.Role;
import serviplus.sp_back.jwt.JwtService;
import serviplus.sp_back.repository.AdminRepository;
import serviplus.sp_back.repository.CategoryRepository;
import serviplus.sp_back.repository.ClientRepository;
import serviplus.sp_back.repository.ProviderRepository;
import serviplus.sp_back.service.ImageServiceImpl;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final ClientRepository clientRepository;
    private final AdminRepository adminRepository;
    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ImageServiceImpl imageServiceImpl;
    private final CategoryRepository categoryRepository;

    @Override
    public AuthResponse registerAdmin(Admin adminRequest) {
        Admin adminRegister = new Admin();
        adminRegister.setName(adminRequest.getName());
        adminRegister.setMail(adminRequest.getMail());
        adminRegister.setAddress(adminRequest.getAddress());
        adminRegister.setPhone(adminRequest.getPhone());
        adminRegister.setState(false);
        adminRegister.setPassword(passwordEncoder.encode(adminRequest.getPassword()));
        adminRegister.setRol(Role.ADMIN);

        adminRepository.save(adminRegister);
        var jwtToken = jwtService.generateToken(adminRegister, generateExtraClaims(adminRegister));
        return AuthResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthResponse registerClient(Client clientRequest) {
        Client clientRegister = Client.builder()
                .name(clientRequest.getName())
                .mail(clientRequest.getMail())
                .address(clientRequest.getAddress())
                .phone(clientRequest.getPhone())
                .state(false)
                .password(passwordEncoder.encode(clientRequest.getPassword()))
                .rol(Role.USER)
                .build();

        clientRepository.save(clientRegister);
        String jwtToken = jwtService.generateToken(clientRegister, generateExtraClaims(clientRegister));
        return AuthResponse.builder().token(jwtToken).build();
    }

    private Map<String, Object> generateExtraClaims(Client clientRegister) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", clientRegister.getName());
        extraClaims.put("role", clientRegister.getRol().name());
        extraClaims.put("authorities", clientRegister.getAuthorities());
        extraClaims.put("userEmail", clientRegister.getUsername());
        return extraClaims;
    }

    @Override
    public AuthResponse registerProvider(Provider providerRequest, MultipartFile file) {
        // Crear una nueva instancia de Provider
        Provider providerRegister = new Provider();
        providerRegister.setName(providerRequest.getName());
        providerRegister.setMail(providerRequest.getMail());
        providerRegister.setAddress(providerRequest.getAddress());
        providerRegister.setPhone(providerRequest.getPhone());
        providerRegister.setSalary(providerRequest.getSalary());

        // Guardar la imagen y obtener la referencia
        Image savedImage = imageServiceImpl.saveImage(file);
        providerRegister.setImage(savedImage);

        providerRegister.setState(false);
        providerRegister.setPassword(passwordEncoder.encode(providerRequest.getPassword()));
        providerRegister.setRol(Role.PROVIDER);

        // Asignar la categoría al proveedor
        Category category = categoryRepository.findById(providerRequest.getCategory().getId()).orElse(null);
        if (category != null) {
            providerRegister.setCategory(category);
            category.getProviders().add(providerRegister);
        } else {
            throw new RuntimeException("Category not found");
        }

        // Guardar el proveedor en el repositorio
        providerRepository.save(providerRegister);

        // Generar el token JWT
        String jwtToken = jwtService.generateToken(providerRegister, generateExtraClaims(providerRegister));

        return AuthResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthResponse authenticateLogin(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getMail(), loginRequest.getPassword()));
        UserDetails user = clientRepository.findByMail(loginRequest.getMail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user, generateExtraClaims((Client) user));
        return AuthResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthResponse validateToken(String jwt) {
        try {
            String validarToken = jwtService.getUserName(jwt);
            AuthResponse authResponse = new AuthResponse();
            Client userClient = clientRepository.findByMail(validarToken).orElse(null);
            authResponse.setName(userClient.getName());
            authResponse.setMail(userClient.getMail());
            authResponse.setToken(jwt);
            authResponse.setRol(userClient.getRol().toString());
            return authResponse;
        } catch (Exception e) {
            System.out.println("Error al traer los datos desde el JWT");
            throw new Error(e.getMessage());
        }

    }
}
