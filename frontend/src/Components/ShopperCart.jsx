import React, { useState, useEffect } from 'react';
import {Row,Col,Table,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../Components/ShopperCart.css';
import cart from '../assets/cart.png';


function ShopCart({cartItems}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    let tempPrice= 0;
    let tempQuantity = 0;
    Object.keys(cartItems).map((cartItemId) => {
        const details= cartItems[cartItemId];
        tempQuantity += details.quantity;
        tempPrice += details.quantity * details.price;
    });
    setTotalQuantity(tempQuantity);
    setTotalPrice(tempPrice);
}, [])

  return (
    <>
      <div className='cart-div'>
        <Nav />
      </div>
      <Row>
        <Col>
          <Table style={{marginTop:40,border:'2px solid Black',width:'500px',marginLeft:'5rem',marginTop:'4rem'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cartItems).map((cartItemId) => {
                const itemDetails = cartItems[cartItemId];
                return (
                  <tr>
                    <td>{itemDetails.title}</td>
                    <td>{itemDetails.quantity}</td>
                    <td>{itemDetails.quantity * itemDetails.price}</td>
                  </tr>
                )
              })}
              <tr style={{ marginTop: 40, border: '2px solid Black' }}>
                <td>Total</td>
                <td>{totalQuantity}</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={() => navigate('/shopcheckout')} style={{ marginLeft:'5rem',marginTop:'2rem'}}>Checkout</Button>
      </Col>
        <Col>
          <img src={cart} />
        </Col>
      </Row>
  
    
    
    
    </>
   
  )
}

export default ShopCart