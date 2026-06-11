import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// === Layout Layouts ===
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// === Main Route Pages ===
import Home from "../pages/Home";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import AccountPage from "../pages/AccountPage";
import WishlistPage from "../pages/WishlistPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";

// === Feature-Injected Page Inclusions ===
import CheckoutPage from "../pages/CheckoutPage";
import OrderCancelPage from "../pages/OrderCancelPage";
import LoginPage from "../features/auth/components/LoginPage";
import SignupPage from "../features/auth/components/SignupPage";

// === Static Information Footer Pages ===
import AboutUsPage from "../pages/info/AboutUsPage";
import ContactPage from "../pages/info/ContactPage";
import FAQPage from "../pages/info/FAQPage";
import PrivacyPolicy from "../pages/info/PrivacyPolicy";
import TermsOfService from "../pages/info/TermsOfService";
import CookiesPolicy from "../pages/info/CookiesPolicy";
import CareerPage from "../pages/info/CareerPage";
import PressPage from "../pages/info/PressPage";
import ShipingPolicy from "../pages/info/ShipingPolicy";
import ReturnsExchanges from "../pages/info/ReturnsExchanges";
import SustainabilityPage from "../pages/info/SustainabilityPage";

// === Profile Dashboard Tabs ===
import DashboardViewPage  from '../pages/accounts/DashboardViewPage'
import {AddressViewPage}  from '../pages/accounts/AddressViewPage'
import {OrdersViewPage}  from '../pages/accounts/OrdersViewPage'
import {SecurityViewPage}  from '../pages/accounts/SecurityViewPage'
import {SettingsViewPage}  from '../pages/accounts/SettingsViewPage'

// === Administrative Dash Workspace ===
import AdminLoginPage from "../features/auth/components/AdminLoginPage";
import OverviewPage from "../pages/admin/OverviewPage";
import {ProductsManagementPage} from "../pages/admin/ProductsManagementPage";
import CustomerManagementPage from "../pages/admin/CustomerManagementPage";
import OrderManagementPage from "../pages/admin/OrderManagementPage";
import AdminSettings from "../pages/admin/AdminSettings";
import HomeContentPage from "../pages/admin/HomeContentPage";
import AdminInquiries from "../pages/admin/AdminInquiries";
import {AddProductForm} from "../pages/admin/AddProductForm";
import {EditProductForm} from "../pages/admin/EditProductForm";

// Secure Verification Checkpoint Gate Middleware
const AdminProtectedGate = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.isAdmin === true;

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
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
            element: <CartPage />,
          },
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
        ],
      },
      {
        path: "account",
        element: <AccountPage />,
        children: [
          {
            index: true,
            element: <DashboardViewPage />,
          },
          {
            path: "address",
            element: <AddressViewPage />,
          },
          {
            path: "orders",
            children: [
              {
                index: true,
                element: <OrdersViewPage />,
              },
              {
                path: "order-cancel/:orderId",
                element: <OrderCancelPage />,
              },
            ],
          },
          {
            path: "security",
            element: <SecurityViewPage />,
          },
          {
            path: "settings",
            element: <SettingsViewPage />,
          },
        ],
      },
      {
        path: "product/:slug",
        element: <ProductPage />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "sustainability",
        element: <SustainabilityPage />,
      },
      {
        path: "career",
        element: <CareerPage />,
      },
      {
        path: "press",
        element: <PressPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "shipping-policy",
        element: <ShipingPolicy />,
      },
      {
        path: "returns-exchanges",
        element: <ReturnsExchanges />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermsOfService />,
      },
      {
        path: "cookies",
        element: <CookiesPolicy />,
      },
    ],
  },
  {
    path: "/order/success/:orderId",
    element: <OrderSuccessPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
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
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedGate>
        <AdminLayout />
      </AdminProtectedGate>
    ),
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsManagementPage />,
          },
          {
            path: "add",
            element: <AddProductForm />,
          },
          {
            path: "edit/:id",
            element: <EditProductForm />,
          },
        ],
      },
      {
        path: "users",
        element: <CustomerManagementPage />,
      },
      {
        path: "orders",
        element: <OrderManagementPage />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      {
        path: "homepage",
        element: <HomeContentPage />,
      },
      {
        path: "inquiries",
        element: <AdminInquiries />,
      },
    ],
  },
]);