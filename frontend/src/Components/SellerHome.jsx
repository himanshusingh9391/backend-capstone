import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Nav from './Nav';
import Button from 'react-bootstrap/Button';
import Sales from '../assets/sales.png';
import Goal from '../assets/goal.png';
import '../Components/SellerHome.css';

function SellerHome() {
    const navigate = useNavigate();
    const [alldata,setAlldata] = useState([]);

useEffect(()=>{
    getData();
},[])

function getData(){
    fetch("https://shopsy-ikxy.onrender.com/get-image",{
        method: "get",
        headers:{
            "Content-Type" : "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }

    }).then((res)=> res.json()).then((data)=>{
        // console.log(data)
        setAlldata(data.data)
    })
}

const deleteProduct = async (id) =>{
    let result = await fetch(`https://shopsy-ikxy.onrender.com/product/${id}`,{
        method: 'Delete',
        headers:{
            "Content-Type" : "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result= await result.json()
    if(result){
        getData();
    }
}

  return (
    <>
    <div className='home-container'>
        <Nav />
              <Row>
                  <Col>
                      <div>
                          <p>SALES PERFORMANCE</p>
                          <img src={Sales} style={{ width: '50vh', height: '40vh', marginLeft: '4rem' }} />
                      </div>
                      <hr className='hori-line' />
                      <div>
                          <p>THIS MONTH GOAL</p>
                          <img src={Goal} style={{ width: '40vh', height: '20vh', marginLeft: '4rem' }} />
                      </div>
                  </Col>
                    <Col>
                    <div className='sell-homecol-2'>
                    <div>
                        <h3>YOUR PRODUCTS</h3>
                    </div>
                    <div className='sell-but'>
                        <Button onClick={()=>navigate('/selleraddproduct')}>Add New Product</Button>
                    </div>
                    <div className='sellerdata-data'>
                    {alldata.map((data,index)=>{
                        return(
                            <div key={data._id}>
                                <Card className='sellerimg-card'>
                                    <Card.Img src={data.image} className='sellerdata-img'/>
                                    <Card.Body>
                                        <Card.Title style={{marginTop:'1rem'}}>{data.title}</Card.Title>
                                        <Card.Text style={{marginTop:'0.5rem',marginLeft:'0.5rem'}}>${data.price}</Card.Text>
                                        <Card.Text style={{marginTop:'-2.8rem',marginLeft:'5rem'}} className='sellercard-discount'>({data.discount}off)</Card.Text>
                                        <Button variant="primary" className='sellercard-but'><Link to={'/sellerupdateproduct/'+data._id} style={{color:'white'}} >Edit</Link></Button>
                                        <Button variant="danger" className='sellercard-but' onClick={()=>deleteProduct(data._id)}>Delete</Button>
                                    </Card.Body>
                                   
                                </Card>

                            </div>
                        )
                    })}
                    </div>
                   
                    

                    </div>
                                            
                    
                    
                    
                    </Col>
        </Row>
        
           
        
    </div>
    </>
    
  )
}

export default SellerHome