export default class AuthService {
  async onLogin(mail, password) {
    const response = await fetch(
      "http://localhost:8080/api/auth/authenticate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail, password }),
      }
    );

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("jwt", token);
      //TODO --> create method checkCredentials() to extract from JWT the userName, and the rol
      return response;
    } else {
      throw new Error("Login failed");
    }
  }

  async onRegister(formState) {
    const response = await fetch(
      "http://localhost:8080/api/auth/registerClient",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      }
    );
    return response.ok;
  }

  async onRegisterProvider(data) {
    const formData = new FormData();
    formData.append("mail", data.mail);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("file", data.file);
    formData.append("salary", data.salary);
    formData.append("category", data.category);
    formData.append("password", data.password);
    // Agrega otros campos según sea necesario

    const response = await fetch(
      "http://localhost:8080/api/auth/registerProvider",
      {
        method: "POST",
        body: formData,
      }
    );

    return response.ok;
  }

  async onRegisterCategory(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("file", data.file);

    const response = await fetch("http://localhost:8080/admin/category", {
      method: "POST",
      body: formData,
    });

    return response.ok;
  }

  async updateCategory(id, data) {
    const url = `http://localhost:8080/admin/category/${id}`;
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("imagen", data.imagen);

    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      return true; // Actualización exitosa
    } else {
      const errorData = await response.json();
      return errorData; // Devuelve los detalles del error
    }
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  get token() {
    return localStorage.getItem("jwt");
  }
}
