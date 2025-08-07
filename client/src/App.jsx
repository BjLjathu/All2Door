import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeature from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/producs";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingLayout from "./components/shopping-view/shopping-layout";
import CheckAuth from "./components/comman/check-auth";
import UnAuthPage from "./pages/unauth-page/unauth-page";



function App() {

  const isAuthenticated =false
  const user = null
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      {/* common component */}
 
      <Routes>
        {/* this Routes for the login and register page  */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user }>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* this routes for the admin panel */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user }>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeature />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        {/* this routes for the cilent side views */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user }>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage/>}/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
