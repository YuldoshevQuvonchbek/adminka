import Login from "../pages/login/login";
import Pointer from "../pages/pointer/pointer";
import CatygoryList from "../pages/category/categoryList/catygoryList";
import Subcatygory from "../pages/category/subCatygory/subcatygory";
import User from "../pages/user/user";
import CreateProduct from "../pages/category/create-product/create-product";
import CreateCategory from "../pages/category/create-catygory/create-catygory";
import EdiCatygory from "../pages/category/edit-cotygory/edit_catygory";
import Brand from "../pages/brand/brand";
import BrandCrate from "../pages/brand/brand-Create/brand-Crate";
import BandEdit from "../pages/brand/brand-edit/brandEdit";
import SubCatygoryCreate from "../pages/category/subCatygory/subCatygoryCreate/subCatygoryCreate";
import SubAttribute from "../pages/category/subCatygory/subAttribute/subAttribute";
import ProductList from "../pages/product/productList/productList";
import ProductCreate from "../pages/product/productCreate/productCreate";
import EditSubcatygory from "../pages/category/subCatygory/edit-subcotygory/edit_subcatygory";
import EditProduct from "../pages/product/productEdit/edit-Product";
import Notfaunt from "../pages/Notfaunt/Notfaunt";
import { routerType } from "./routerType";
import BannerList from "../pages/banner/bannerList";
import BannerEdit from "../pages/banner/banner-edit/BannerEdit";
import BannerCreate from "../pages/banner/bannerCreate/banner-create";

export const Main_pages: routerType[] = [
  {
    component: Login,
    path: "login",
  },
  {
    component: Pointer,
    path: "pointer",
  },
  {
    component: CatygoryList,
    path: "catygoryList",
  },
  {
    component: Subcatygory,
    path: "Subcatygory",
  },
  {
    component: User,
    path: "User",
  },
  {
    component: CreateProduct,
    path: "createProduct",
  },
  {
    component: CreateCategory,
    path: "createCategory",
  },
  {
    component: EdiCatygory,
    path: "ediCatygory/:id",
  },
  {
    component: EditSubcatygory,
    path: "EditSubcatygory/:id",
  },
  {
    component: Brand,
    path: "brand",
  },
  {
    component: BrandCrate,
    path: "brandCrate",
  },
  {
    component: BandEdit,
    path: "bandEdit/:id",
  },
  {
    component: SubCatygoryCreate,
    path: "subCatygoryCreate",
  },
  {
    component: SubAttribute,
    path: "subAttribute",
  },
  {
    component: ProductList,
    path: "productList",
  },
  {
    component: ProductCreate,
    path: "productCreate",
  },
  {
    component: EditProduct,
    path: "EditProduct/:id",
  },
  {
    component: BannerList,
    path: "bannerList",
  },
  {
    component: BannerCreate,
    path: "bannerCreate",
  },

  {
    component: BannerEdit,
    path: "bannerEdit/:id",
  },

  {
    component: Notfaunt,
    path: "*",
  },
];
