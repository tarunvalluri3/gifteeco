import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Catalogs from "./Pages/Catalogs";
import BuildYourOwnKit from "./Pages/BuildYourOwnKit";
import Pricing from "./Pages/Pricing";
import GetStarted from "./Pages/GetStarted";
import BrandYourProducts from "./Pages/BrandYourProducts";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/catalogs" element={<Catalogs />} />
          <Route path="/build-your-own-kit" element={<BuildYourOwnKit />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/brand-your-products" element={<BrandYourProducts />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
