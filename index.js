const express = require('express');
// require('./DB/Config');
const cors = require("cors");
const User = require('./DB/User');
const Products = require('./DB/Products'); // for shopper products
const AddSellerProduct = require('./DB/AddProductsSeller'); // for seller products
const Jwt = require('jsonwebtoken');
const jwtKey = 'cap';


// const multer = require('multer')
// const fs = require("fs");
const app = express();
// const PORT = process.env.PORT || 2000;

const mongoose = require('mongoose');
const uri = 'mongodb+srv://himanshusingh9030:singh123@cluster0.umtnblw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error'));
db.once('open',()=>{
  console.log('successfully connected to db');
})


app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>{
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  Jwt.sign({result}, jwtKey, {expiresIn:'2h'}, (err,token)=>{
      if(err){
          res.send({result : "something went wrong"})
      }
      res.send({result, auth:token})
  })
 
})

app.post('/login',async(req,res)=>{
  if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select('-password') 
    if(user){
        Jwt.sign({user}, jwtKey,{expiresIn:'2h'},(err,token)=>{
            if(err){
                res.send({result:'something went wrong'})
            }
            res.send({user, auth: token})
        })

    }}
})


app.get('/search/:key',verifyToken, async (req,res)=>{
  let result = await AddSellerProduct.find(
    {
      "$or":[
        {"title":{$regex:req.params.key}}
      ]
    }
  )
  res.send(result)
})

app.post('/uploadseller-image',verifyToken,async(req,res)=>{
  const { base64,title,description,price,discount } = req.body;
  try{
    await AddSellerProduct.create({image: base64, title:title, description: description, price: price, discount: discount});
    res.send({Status : "ok"})

  }catch(error){
    res.send({Status:'error',data : error})
  }
})

app.get('/get-image', verifyToken, async(req,res)=>{
  try{
    await AddSellerProduct.find({}).then(data =>{
      res.send({Status: "ok", data: data})
    })
  }catch (error){

  }
})

app.delete('/product/:id',verifyToken, async(req,res)=>{
 let result = await AddSellerProduct.deleteOne({_id:req.params.id})
 res.send(result);
});

app.get('/product/:id',verifyToken, async(req,res)=>{
  let result  = await AddSellerProduct.find({_id:req.params.id})
  if(result){
    res.send(result)
  }else{
    res.send({result : "No data found"})
  }
})

app.put('/product/:id',verifyToken, async(req,res)=>{
  let result = await AddSellerProduct.updateOne(
    {_id: req.params.id},
    {
      $set : req.body
    }
    )
    res.send(result)
})

function verifyToken(req,res,next){
  let token = req.headers['authorization']
  if(token){
      token = token.split(' ')[1];
      // console.log('middleware if',token)
      Jwt.verify(token,jwtKey,(err,valid)=>{
          if(err){
              res.status(401).send({result : "please provide valid token"})
          }else{
              next();
          }
      })
  }else{
      res.status(403).send({result :'please add token with header'})
   }
 
}
 


app.listen(2000)


