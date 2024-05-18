import { AuthProvider } from "./context/useAuthStore";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
