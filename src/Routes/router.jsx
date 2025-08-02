import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import HomeLayout from "../Layouts/HomeLayout";
import Providers from "../components/Providers";
import Error from "../Layouts/Error";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Layouts/Login";
import Register from "../Layouts/Register";
import ForgotPassword from "../Layouts/ForgotPassword";
import ProviderDetails from "../components/ProviderDetails";
import PrivateRoute from "./PrivateRoute";
import UserReview from "../Layouts/UserReview";
import ConsumerProfile from "../components/Profiles/ConsumerProfile";
import ProviderProfile from "../components/Profiles/ProviderProfile";
import Catering from "../components/OurServices/Catering";
import OrderManage from "../components/OurServices/OrderManage";
import Delivery from "../components/OurServices/Delivery";
import Order from "../components/OurPackages/OurPackages";
import AddCatering from "../components/Catering/AddCatering";
import AdminRouter from "../admin/AdminRouter";
import ManageAdmin from "../admin/ManageUsers";
import PendingCaterings from "../admin/PendingCaterings";
import AddAdmin from "../admin/AddAdmin";
import OrderToDelivery from "../admin/OrderToDelivery";
import Faq from "../components/FAQ/Faq";
import Blog from "../components/Blog/Blog";
import FavouriteProviders from "../components/FavouriteProviders";
import BlogField from "../components/Blog/BlogField";
import BlogsList from "../components/Blog/BlogsList";
import UpdatedBlog from "../components/Blog/UpdatedBlog";
import FoodKindle from "../pages/CaCoVerse/FoodKindle";
import FeedingBD from "../pages/CaCoVerse/FeedingBD";
import Purevia from "../pages/CaCoVerse/Purevia";
import HelloCaCo from "../pages/CaCoVerse/HelloCaCo";
import PayFail from "../Payment/Fail/PayFail";
import PaySuccess from "../Payment/Success/PaySuccess";
import AdminDashboard from "../Layouts/AdminDashboard";
import ManageUsers from "../admin/ManageUsers";
import DashboardOverview from "../admin/DashboardOverview";
import ManageProviders from "../admin/ManageProviders";
import UpdateProviders from "../admin/UpdateProviders";
import PendingCateringDetails from "../admin/PendingCateringDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/providers",
        element: <Providers></Providers>,
      },
      {
        path: "provider/:id",
        element: <ProviderDetails></ProviderDetails>,
      },
      {
        path: "/favoriteProviders",
        element: <FavouriteProviders></FavouriteProviders>,
      },
      {
        path: "/catering",
        element: <Catering></Catering>,
      },
      {
        path: "/orderManage",
        element: <OrderManage></OrderManage>,
      },
      {
        path: "/delivery",
        element: <Delivery></Delivery>,
      },
      {
        path: "/order",
        element: <Order></Order>,
      },
      {
        path: "/add-catering",
        element: <AddCatering></AddCatering>,
      },
      {
        path: "faq",
        element: <Faq></Faq>,
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "/payment/fail/:tranId",
        element: <PayFail></PayFail>,
      },
      {
        path: "/payment/success/:tranId",
        element: <PaySuccess></PaySuccess>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/auth/consumer-profile",
        element: <ConsumerProfile></ConsumerProfile>,
      },
      {
        path: "/auth/provider-profile",
        element: <ProviderProfile></ProviderProfile>,
      },
    ],
  },
  {
    path: "/private",
    element: (
      <PrivateRoute>
        <UserReview></UserReview>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/private/user-review",
        element: <UserReview></UserReview>,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "dashboard",
        element: <DashboardOverview />
      },
      {
        path: "manageUsers",
        element: <ManageUsers />
      },
      {
        path: "pendingCaterings",
        element: <PendingCaterings />
      },
      {
        path: "pendingCateringsDetails/:id",
        element: <PendingCateringDetails />
      },
      {
        path: "manageProviders",
        element: <ManageProviders />
      },
      {
        path: "addAdmin",
        element: <AddAdmin />,
      },
      {
        path: "orderToDelivery",
        element: <OrderToDelivery />,
      },
      {
        path: "updateProviders/:id",
        element: <UpdateProviders />
      },
      {
        path: "blogField",
        element: <BlogField />,
      },
      {
        path: "blogList",
        element: <BlogsList />,
      },
      {
        path: "updateBlog/:id",
        element: <UpdatedBlog />,
        loader: ({ params }) =>
          fetch(
            `https://quick-foods-server.vercel.app/blogs/${params.id}`
          ),
      },
    ],
  },
  {
    path: "foodKindle",
    element: <FoodKindle></FoodKindle>,
  },
  {
    path: "feedingBD",
    element: <FeedingBD></FeedingBD>,
  },
  {
    path: "purevia",
    element: <Purevia></Purevia>,
  },
  {
    path: "helloCaCo",
    element: <HelloCaCo></HelloCaCo>,
  },

  {
    path: "*",
    element: <Error></Error>,
  },
]);
export default router;
