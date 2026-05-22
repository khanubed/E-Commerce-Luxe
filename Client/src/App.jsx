import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import SignupPage from "./components/auth/SignupPage";
import LoginPage from "./components/auth/LoginPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import { Provider } from "react-redux";

import ProductPage from "./pages/ProductPage";
import { productPageLoader } from "./router/router";
import AdminLayout from "./layouts/AdminLayout";
import OverviewPage from "./pages/admin/OverviewPage";
import { ProductsManagementPage } from "./pages/admin/ProductsManagementPage";
import CustomerManagementPage from "./pages/admin/CustomerManagementPage";
import OrderManagementPage from "./pages/admin/OrderManagementPage";
import AdminSettings from "./pages/admin/AdminSettings";
import HomeContentPage from "./pages/admin/HomeContentPage";
import { AddProductForm } from "./pages/admin/AddProductForm";
// import App from './App.jsx'

import {Toaster} from 'react-hot-toast'

import {
  AddressView,
  DashboardView,
  OrdersView,
  PaymentView,
  SecurityView,
  SettingsView,
} from "./components/accounts/AccountsCompoents";
import CheckoutPage from "./components/cart/CheckoutPage";
import OrderCancelPage from "./pages/account/OrderCancelPage";
import AboutUsPage from "./pages/footer/AboutUsPage";
import SustainabilityPage from "./pages/footer/SustainabilityPage";
import CareersPage from "./pages/footer/CareerPage";
import PressPage from "./pages/footer/PressPage";
import ShippingPolicy from "./pages/footer/ShipingPolicy";
import ReturnsExchanges from "./pages/footer/ReturnsExchanges";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsOfService from "./pages/footer/TermsOfService";
import CookiesPolicy from "./pages/footer/CookiesPolicy";
import FAQPage from "./pages/footer/FAQPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "cart",
        children: [
          {
            index: true,
            Component: CartPage,
          },
          {
            path: "checkout",
            Component: CheckoutPage,
          },
        ],
      },
      {
        path: "account",
        Component: AccountPage,
        children: [
          {
            index: true,
            Component: DashboardView,
          },
          {
            path: "address",
            Component: AddressView,
          },
          {
            path: "orders",
            children: [
              {
                index: true,
                Component: OrdersView,
              },
              {
                path: "order-cancel/orderid",
                Component: OrderCancelPage,
              },
            ],
          },
          {
            path: "payment",
            Component: PaymentView,
          },
          {
            path: "security",
            Component: SecurityView,
          },
          {
            path: "settings",
            Component: SettingsView,
          },
        ],
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
        loader: productPageLoader,
      },
      {
        path: "about",
        Component: AboutUsPage,
      },
      {
        path: "sustainability",
        Component: SustainabilityPage,
      },
      {
        path: "career",
        Component: CareersPage,
      },
      {
        path: "press",
        Component: PressPage,
      },
      {
        path: "faq",
        Component: FAQPage,
      },
      {
        path: "shipping-policy",
        Component: ShippingPolicy,
      },
      {
        path: "returns-exchanges",
        Component: ReturnsExchanges,
      },
      {
        path: "privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "terms",
        Component: TermsOfService,
      },
      {
        path: "cookies",
        Component: CookiesPolicy,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        Component: OverviewPage,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            Component: ProductsManagementPage,
          },
          {
            path: "add",
            Component: AddProductForm,
          },
        ],
      },

      {
        path: "users",
        Component: CustomerManagementPage,
      },
      {
        path: "orders",
        Component: OrderManagementPage,
      },
      {
        path: "settings",
        Component: AdminSettings,
      },
      {
        path: "homepage",
        Component: HomeContentPage,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "0px", 
            background: "#020617", 
            color: "#fff",
            padding: "16px",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "0.2em",
            border: "1px solid #ffffff10",
            textTransform: "uppercase",
          },
          success: {
            iconTheme: {
              primary: "#d97706", // amber-600
              secondary: "#fff",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
