import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png';
import Cart from '../assets/b1.png';
import user from '../assets/user.png';


function Nav() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user')

    const logout = () =>{
        localStorage.clear();
        navigate('/')
    }

    return (
        <>    
        <div className='nav-top'>
        <img src ={Logo} className='logo'/>
        <h1>Star Shopper</h1>
        {auth? <ul className=' nav-link'>
        <li><Link onClick={logout} to='/' className='link'>Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
        :
        <ul>
            <li><Link to='/'>Signup</Link></li>
            {/* <li><Link to='/login'>Login </Link></li> */}
        </ul>      
}
    <div className='comp'>
        <img src={Cart} style={{marginRight:'2rem'}} onClick={()=>navigate('/shopcart')}/>
        {/* {user && <Button onClick={()=> navigate('/cart')}>Cart &nbsp; {Object.keys(cartItems).length > 0 && (<Badge bg='success'>{Object.keys(cartItems).length}</Badge>)}</Button>}
        &nbsp;&nbsp;&nbsp; */}
        <img src = {user}/>
    </div>
    
    </div>
    </>

  )
}

export default Nav