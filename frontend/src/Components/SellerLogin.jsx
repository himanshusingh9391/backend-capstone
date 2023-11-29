import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Shop from '../assets/SHOP.png';
import '../Components/Shopperlogin.css';
import {Row,Col} from 'react-bootstrap';


function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])

    const handleLogin= async ()=>{
        // console.log("email,password",email,password)
        let result = await fetch('http://localhost:2000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result)
        if(result.auth){
        localStorage.setItem('user',JSON.stringify(result.user))
        localStorage.setItem('token',JSON.stringify(result.auth))
        navigate('/sellerhome')
        }else{
            alert('enter correct details')
        }
    }
  return (
    <div className='ss'>
    <div className='Registers'>
        <Row >
                  <Col className='img-col'>
                      <img src={Shop} style={{ height: '350px', marginLeft: '6rem' }} className='bags' />
                      <button className='but-home' onClick={()=>navigate('/')}>GOTO HOME</button>
                  </Col>
                  <Col>
                    <div className='text-col'>
                        <h4>Login and start shopping from your favourite brands. Refer a friend and save 50% OFF</h4>
                        <input type='text' placeholder='Enter Email' className='inputBox' onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                        <input type='password' placeholder='Enter Password'className='inputBox' onChange={(e) => setPassword(e.currentTarget.value)} value={password} />
                        <button onClick={handleLogin} className='appButton' type='Button'>Login</button> 
                    </div>
                  </Col>
        </Row>
    </div>
    </div>
  )
}

export default Login