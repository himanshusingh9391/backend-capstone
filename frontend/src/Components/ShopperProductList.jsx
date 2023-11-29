import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Components/ShopperProductList.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Nav from './Nav';


function ProductList({cartItems,handleAddToCart}) {

  const [data,setData] = useState([]);
  const navigate = useNavigate();
  const [alldata,setAlldata] = useState([]);

  useEffect(()=>{
      getData();
  },[])

  function getData(){
    fetch("http://localhost:2000/get-image",{
        method: "get",
        headers:{
          "Content-Type" : "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }

    }).then((res)=> res.json()).then((data)=>{
        console.log(data)
        setAlldata(data.data)
    })
}


  useEffect(()=>{
    
    // axios.get('http://localhost:3000/upload').then((res)=>setData(res.data))
    // console.log(data)
    
    getData();
  },[])

  // const getProducts = async ()=>{
  //   let product = await fetch('http://localhost:2000/upload')
  //   product = await product.json();
  //   setData(product)
  // }

  const handleSearch = async (event) =>{
    let key  = event.target.value;
    if(key){
    let result = await fetch(`http://localhost:2000/search/${key}`,{
      headers : {
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json()
    if(result){
      setAlldata(result)
    }
  }else{
    getData();
  }
  }

  return (
    <>
    <div className='back'>
      <Nav/>
      {/* <h1>Product List</h1> */}
      <div className='search-product-box'>
        <input type='text' onChange={handleSearch} placeholder='Search Product' className='search' />
        <button onClick={()=>navigate('/shopcart')}>GOTO Cart</button>
        </div>
      
      <div className='single'>

      <div className='sellerdata-datas'>
                    {alldata.map((data)=>{
                        return(
                            <div key={data._id}>
                                <Card className='sellerimg-card'>
                                    <Card.Img src={data.image} className='sellerdata-img'/>
                                    <Card.Body>
                                        <Card.Title >{data.title}</Card.Title>
                                        <Card.Text style={{marginTop:'0.5rem',marginLeft:'0.5rem'}}>${data.price}</Card.Text>
                                        <Button className='button' onClick={() => {
                                          let id = data._id;
                                          console.log(id);
                                          if (id in cartItems) {
                                            const currentItem = cartItems[id];
                                            handleAddToCart({ [id]: { title: `${data.title}`, price: `${data.price}`, quantity: currentItem.quantity + 1 } })
                                          }
                                          else {
                                            handleAddToCart({ [id]: { title: `${data.title}`, price: `${data.price}`, quantity: 1 } })
                                          }
                                        }}
                                        >Add to cart</Button>
                                    </Card.Body>
                                   
                                </Card>

                            </div>
                        )
                    })}
                    </div>
        {/* {
          data.map((single)=>{
            const base64String = btoa(String.fromCharCode(...new Uint8Array(single.image.data.data)));
            return (
              <div key={single._id} style={{padding:30}} >
                <Card style={{width:'19rem', padding:25,height:200,overflow:'hidden',margin:10}}>
                  <Card.Img src={`data:image/png;base64,${base64String}`} alt="" className='img' />
                  <Card.Body>
                    <Card.Text style={{ marginTop: '1rem', color: 'black' }}>{single.name}</Card.Text>
                    <Card.Text style={{ color: 'black' }} >${single.price}</Card.Text>

                  </Card.Body>
                  <Button className='button' onClick={()=>{
                    let id = single._id;
                    console.log(id);
                    if( id in cartItems){
                      const currentItem=cartItems[id];
                      handleAddToCart({[id]:{name:`${single.name}`,price:`${single.price}`,quantity:currentItem.quantity+1}})
                  }
                  else{
                    handleAddToCart({[id]:{name:`${single.name}`,price:`${single.price}`,quantity:1}})
                  }
                  }}
                  >Add to cart</Button>
                  </Card>
              </div>
            )
          })
        }  
      </div> */}
      </div>
      </div>

    </>
  )
}

export default ProductList
