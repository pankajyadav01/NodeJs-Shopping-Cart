const express = require('express')

const app = express()

const {
  db,
  vendors,
  products,
  users,
  carts
} = require('./db')

var currentUser=null
var currUserId=null
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',
    express.static(__dirname + '/public')
)

app.get('/vendor',async (req,res)=>{
  const list = await vendors.findAll()
  res.send(list)
})

app.get('/cart',async (req,res)=>{
  console.log('in cart get')
  // const productId= await carts.findAll({
  //   where: {
  //       username: currentUser //array
  //     },
  //     attributes: ['productId'], //object
  // })

  // var prid=[]
  // for( pid of productId){
  //   prid.push(pid.productId)
  // }
  // const list = await products.findAll({
  //   where:{
  //     id:prid
  //   }
  // })
  // console.log(list)
  // res.send(list)





  await carts.findAll({
    where : {username : currentUser},
    include : [products]
}).then(products => {
  console.log('**************************************************************************8')
  res.send(products)
    
  })






})

app.get('/product',async (req,res)=>{
  const list = await products.findAll()
  res.send(list)
})

app.get('/vendor/:id',async(req,res)=>{
  console.log('completed server')
  
  console.log(req.body)
  console.log(vendors)
  res.send(products.body)
  })

app.post('/vendor', async (req, res) => {
console.log('in post')
  try {
    const result = await vendors.create({
      name: req.body.name
    })
    res.send({success: true})
    console.log('done post')
  } catch (e) {
    res.send({success: false, err: e.message})
  }
})


app.post('/product', async (req, res) => {
  console.log('in post')
  console.log(req.body.vendor)
  try {
    const result = await products.create({
      name: req.body.name,
      price: req.body.price,
      vendor: req.body.vendor,
      qty: req.body.qty,
      vendorId: req.body.vendorId
    })
    res.send({success: true})
    console.log('done post')
  } catch (e) {
    res.send({success: false, err: e.message})
  }
})

app.post('/cart', async (req, res) => {
  console.log('in cart post')
  console.log(req.body)
  try {
    carts.count({where:{productId:req.body.productId,username: currentUser}}).then(async (count) => {
      console.log('count = '+count)
      if (count == 0) {
        const result = await carts.create({
          username: currentUser,
          qty: req.body.qty,
          productId: req.body.productId
        })
        res.send({success: true})
        console.log('done post')
      }
      else{
        carts.increment('qty',{where:{productId: req.body.productId,username:currentUser}})
      }
    })
  } 
  catch (e) {
    res.send({success: false, err: e.message})
  }
})


app.get('/login',(req, res) => {

  var sts
  if(currentUser==null){
    sts=false
  }
  else{
   sts=true
  }
  res.send({success:sts, message:currentUser})

}) 


app.get('/cartTotal', async (req, res) => {
  var total = 0
// Display the list of products in cart
try {
  if(currentUser== null){
    throw new Error('Please Login First')
  }
  const result = await carts.findAll({where : {username : currentUser}})
  
  let tempProduct = null
  for(let product of result) {
    tempProduct = await products.findOne({where : {id : product.productId}})
    total += tempProduct.price * product.qty
    console.log(`price : ${tempProduct.price}, quantity : ${product.qty}`)
    console.log(`Total : ${total}`)
  }
  console.log('entering')
  res.send({total:total})

} 
catch (e) {
  res.send({success:false, error:e.message})
}
}) 
  

app.post('/checkUser',  (req, res) => {
  users.count({where:{username:req.body.username}}).then((count) => {
    console.log("the count is = "+count)
    if (count == 0) {
      users.create({
        username : req.body.username
      })
    }
    currentUser = req.body.username
    const x =  users.findOne({where : {username : req.body.username}})
    currUserId = x.id
    console.log('====================================================================================')
    console.log('====================================================================================')
    console.log(x)
    console.log('====================================================================================')
    console.log('====================================================================================')
    res.send(req.body)

})})


app.post('/logout',  (req, res) => {
  try{
    currentUser = null
    res.send({success:true})
  }
  catch(e){
    res.send({success:false})
  }
})
  
app.delete('/product/:id', (req,res)=>{
  try{
    console.log('in delete')
    products.destroy({
      where: {
          id : req.params.id
      }
  })
  res.send({success: true})
  }
  catch(e){
    res.send({success: false})
  }
})

app.delete('/vendor/:id', (req,res)=>{
  try{
    console.log('in delete')
    vendors.destroy({
      where: {
          id : req.params.id
      }
  })
  res.send({success: true})
  }
  catch(e){
    res.send({success: false})
  }
})
const PORT = process.env.PORT || 4444
db.sync()
    .then(()=>{
      app.listen(PORT, () => {
        console.log(`Started on http://localhost:${PORT}`)
      })
    })