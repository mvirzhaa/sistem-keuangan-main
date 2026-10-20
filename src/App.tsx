import { useRoutes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import { routeConfig } from "./common/routes/routeConfig";
import Footer from "./components/footer/Footer";
import { useAuth } from "./features/auth/hooks/useAuth";

function App() {
  const routes = useRoutes(routeConfig);
  const location = useLocation();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);


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
    <div className="flex flex-col min-h-screen items-center w-full print:min-h-0 print:block">
      <div className="print:hidden w-full">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow mb-30 w-full print:m-0 print:p-0 print:mb-0 print:max-w-none">
        <div>
          <div className="mb-4 print:hidden">
            <Breadcrumb />
          </div>
          <div>{routes}</div>
        </div>
      </div>
      <div className="print:hidden w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
