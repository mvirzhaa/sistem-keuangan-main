import { useRoutes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import { routeConfig } from "./common/routes/routeConfig";
import Footer from "./components/footer/Footer";
import { authController } from "./features/auth/controllers/authController";

function App() {
  const routes = useRoutes(routeConfig);
  const location = useLocation();

  useEffect(() => {
    authController.checkAuthStatus();
  }, []);

  // Halaman yang tidak menggunakan layout navbar
  const noLayoutPages = ["/login", "/unauthorized"];
  const isNoLayoutPage = noLayoutPages.includes(location.pathname);

  // Cek apakah ini adalah halaman yang tidak ditemukan
  // dengan melihat apakah ada route yang cocok selain wildcard
  const validRoutes = routeConfig.filter((route) => route.path !== "*");
  const isValidRoute = validRoutes.some((route) => {
    if (route.path === "/") return location.pathname === "/";
    return (
      route.path &&
      (location.pathname === route.path ||
        location.pathname.startsWith(route.path + "/"))
    );
  });

  if (isNoLayoutPage || !isValidRoute) {
    return <div>{routes}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <div className="container px-4 sm:px-[7rem] py-6 flex-grow mb-30">
        <div>
          <div className="mb-4">
            <Breadcrumb />
          </div>
          <div>{routes}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
