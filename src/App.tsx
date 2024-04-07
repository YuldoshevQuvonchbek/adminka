import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import MainLayout from "./pages/main-layout";
import CatygoryList from "./pages/category/categoryList/catygoryList";
import Subcatygory from "./pages/category/subCatygory/subcatygory";
import User from "./pages/user/user";
import CreateProduct from "./pages/category/create-product/create-product";
import Pointer from "./pages/pointer/pointer";
import CreateCategory from "./pages/category/create-catygory/create-catygory";
import EdiCatygory from "./pages/category/edit-cotygory/edit_catygory";
import Brand from "./pages/brand/brand";
import BrandCrate from "./pages/brand/brand-Create/brand-Crate";
import BandEdit from "./pages/brand/brand-edit/brandEdit";
import { UseSkror } from "./hook/useSkror";
import SubCatygoryCreate from "./pages/category/subCatygory/subCatygoryCreate/subCatygoryCreate";
import SubAttribute from "./pages/category/subCatygory/subAttribute/subAttribute";
import ProductCreate from "./pages/product/productCreate/productCreate";
import ProductList from "./pages/product/productList/productList";
import EditProduct from "./pages/product/productEdit/edit-Product";

function App() {
  return (
    <>
      <UseSkror />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainLayout />}>
          <Route path="pointer" element={<Pointer />} />
          <Route path="catygoryList" element={<CatygoryList />} />
          <Route path="Subcatygory" element={<Subcatygory />} />
          <Route path="User" element={<User />} />
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="createCatygory" element={<CreateCategory />} />
          <Route path="ediCatygory/:id" element={<EdiCatygory />} />
          <Route path="brand" element={<Brand />} />
          <Route path="brandCrate" element={<BrandCrate />} />
          <Route path="bandEdit/:id" element={<BandEdit />} />
          <Route path="subCatygoryCreate" element={<SubCatygoryCreate />} />
          <Route path="subAttribute" element={<SubAttribute />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="productCreate" element={<ProductCreate />} />
          <Route path="editProduct/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
