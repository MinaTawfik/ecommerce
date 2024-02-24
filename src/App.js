import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthProtectedRoute from './Components/ProtectedRoute/AuthProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import AllOrders from './Components/AllOrders/AllOrders';
import Address from './Components/Address/Address';
import CartContextProvider from './Contexts/CartContext';
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import SubmitResetCode from './Components/SubmitResetCode/SubmitResetCode';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import WishlistProducts from './Components/Wishlist/Wishlist';


function App() {

  const queryClient = new QueryClient()

  const route = createBrowserRouter([
      {path:'', element: <Layout/>, children:[
        {path: '', element: <Navigate to={'home'}/>},
        {path: 'ecommerce', element: <AuthProtectedRoute><Login/></AuthProtectedRoute>},
        {path: 'login', element: <AuthProtectedRoute><Login/></AuthProtectedRoute>},
        {path: 'register', element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
        {path: 'forgetpassword', element: <AuthProtectedRoute><ForgetPassword/></AuthProtectedRoute>},
        {path: 'submitresetcode', element: <AuthProtectedRoute><SubmitResetCode/></AuthProtectedRoute>},
        {path: 'resetpassword', element: <AuthProtectedRoute><ResetPassword/></AuthProtectedRoute>},
        
        {path: '*', element: <NotFound/>},

        {path: 'allorders', element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>},
        {path: 'address/:cartId', element: <ProtectedRoute> <Address/> </ProtectedRoute>},
        {path: 'home', element: <ProtectedRoute> <Home/> </ProtectedRoute>},
        {path: 'cart', element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
        {path: 'products', element: <ProtectedRoute> <Products/> </ProtectedRoute>},
        {path: 'productdetails/:id', element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
        {path: 'categories', element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
        {path: 'brands', element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
        {path: 'wishlist', element: <ProtectedRoute> <WishlistProducts/> </ProtectedRoute>},
        // {path: 'updatepassword', element: <ProtectedRoute><UpdatePassword/></ProtectedRoute>},
        
        
      ]}
  ])

  

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <RouterProvider router={route}></RouterProvider>
        </CartContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>

    <ToastContainer />
    
    </>
  );
}

export default App;
