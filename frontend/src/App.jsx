
import { useState} from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import SellerSignup from './Components/SellerSignup';
import SellerLogin from './Components/SellerLogin';
import SellerHome from './Components/SellerHome';
import Two from './Components/Two';
import ShopperSignup from './Components/ShopperSignup';
import ShopperLogin from './Components/ShopperLogin';
import ShopperHome from './Components/ShopperHome';
import ProductList from './Components/ShopperProductList';
import ShopCart from './Components/ShopperCart';
import CheckOut from './Components/ShopperCheckOut';
import SellerAddProduct from './Components/SellerAddProduct';
import SellerUpdateproduct from "./Components/SellerUpdateProduct";


function App() {
  const [cartItems,setCartItems] = useState({});

  
  const handleAddToCart = (item) => {
    setCartItems({...cartItems, ...item});
  }

  return (
    <>
      <div>
      <Routes>
      <Route path='/' element={<Two />}/>
       {/* <Route path='/signup' element={<SignUp/>}/> */}
       <Route path='/shoppersignup' element={<ShopperSignup/>}/>
       <Route path='/shopperlogin' element={<ShopperLogin/>}/>
       <Route path='/shopperhome' element={<ShopperHome/>}/>
       <Route path='/productlist' element={<ProductList  handleAddToCart={handleAddToCart} cartItems={cartItems}/>}/>
       <Route path='/shopcart' element={<ShopCart cartItems={cartItems}/>}/>
       <Route path='/shopcheckout' element={<CheckOut/>}/>
       <Route path='/sellersignup' element={<SellerSignup/>}/>
       <Route path='/login' element={<SellerLogin/>}/>
       <Route path='/sellerhome' element={<SellerHome />}/>
       <Route path='/selleraddproduct' element={<SellerAddProduct/>}/>
       <Route path="/sellerupdateproduct/:id" element={<SellerUpdateproduct/>}/>
       </Routes>
       </div>
    </>
  )
}

export default App
