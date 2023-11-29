import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Bag from '../assets/BAG.png';
import Shop from '../assets/SHOP.png';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// import SignUP from './SignUP';
// import ShopperSignup from './ShopperSignUp';

function Two() {
  const navigate = useNavigate();
  return (
    <div className='twobag'>
        <Row>
            <Col>
                <div className='shopNav'>
                  <img src={Shop} style={{width:'500px'}}/>
                </div>
                <Button variant="primary" className='primary' onClick={()=>navigate('/sellersignup')}>Go to Sellers Login</Button>
            </Col>
            <Col>
                <div className='sellNav'>
                  <img src={Bag}/>
                </div>
                <Button variant="primary" className='primary2' onClick={()=>navigate('/shoppersignup')}>Go to Shoppers Login</Button>
            </Col>
        </Row>
    </div>
  )
}

export default Two