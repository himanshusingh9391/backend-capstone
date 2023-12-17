import React,{useState} from 'react'
import Nav from './Nav';
import {Row,Col} from 'react-bootstrap';
import '../Components/SelleraddProduct.css';
import { useNavigate } from 'react-router-dom';

function SellerAddProduct() {
    const [title,setTitle] = useState('')
    const [description,setDescription]= useState('')
    const [price,setPrice] = useState('')
    const [discount,setDiscount] = useState('')
    const [image,setImage] = useState('')
    const navigate = useNavigate();

    function convertToBase64(e){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=()=> {
        console.log(reader.result);
        setImage(reader.result)
      }
      reader.onerror = error=>{
        console.log("error",error);
      };
    }


    function uploadImage(){
      fetch("https://shopsy-ikxy.onrender.com/uploadseller-image",{
        method: 'post',
        crossDomain: true,
        headers : {
          'content-Type': 'application/json',
          Accept : 'application/json',
          "Access-Control-Allow-Origin": "*",
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body : JSON.stringify({
          base64: image,title,description,price,discount
        })
      }).then((res)=>res.json()).then((data)=>console.log(data))
     navigate('/sellerhome') 
    }

  return (
    <>
    <div className='sell-homemain'>
    <div className='add-pro'>
    <Nav/>
    </div>
          <Row>
              <Col>
                  <div className='inp-seller'>
                      <input type='text' placeholder='Product Title' onChange={(e) => setTitle(e.currentTarget.value)} value={title} />
                      <input type='text' placeholder='Product Description' onChange={(e) => setDescription(e.currentTarget.value)} value={description} />
                      <input type='text' placeholder='Product Price' onChange={(e) => setPrice(e.currentTarget.value)} value={price} />
                      <input type='text' placeholder='Discount' onChange={(e)=>setDiscount(e.currentTarget.value)} value={discount}/>
                      <div>
                      <input accept= "image/*" type='file' onChange={convertToBase64}/>
                      {image=="" || image==null ?"" : <img width={100} height={100} src={image}/>}
                      <button onClick={uploadImage}>upload</button>
                      </div>
                      <hr className='sellhome-hr'/>
                  </div>
                 </Col>
                 
                 <Col>
                    <div className='col2-sellhome'>
                        <p style={{marginTop:'-3rem'}}>Live Preview</p>
                        <div className='right-sellhomecol'>
                        <div>{title}</div>
                        <div>{description}</div>
                        <div>{price}</div>
                        <div>{discount}</div>
                        {/* <div>{image}</div> */}
                        </div>
                       
                    </div>
                 </Col>
   
    </Row>
    
    </div>
    </>
    
  )
}

export default SellerAddProduct