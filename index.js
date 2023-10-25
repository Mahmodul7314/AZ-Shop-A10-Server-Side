
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port= process.env.PORT || 5000

//userName: AZ-Shop
//Pass: HjmmcLwEc54SIP1k

//MIDLEWARE
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://AZ-Shop:HjmmcLwEc54SIP1k@cluster0.b2stcle.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)
// //Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
  


    const productCollection =client.db('productDB').collection('product');
    const cartproductCollection = client.db('producDB').collection('cartproduct');
  


    //for get all product 
    app.get('/product',async(req, res)=>{
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })





    // single product for update and delete
    app.get('/product/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productCollection.findOne(query);
      res.send(result)
    })


    app.post('/product', async(req, res) =>{
      const newProduct = req.body;
      console.log(newProduct)
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })

    //for My Cart post
    app.post('/cartproduct', async(req,res)=>{
      const newProduct = req.body;
      const result = await cartproductCollection.insertOne(newProduct);
      res.send(result);
    })

    //for my cart get
    app.get('/cartproduct',async(req,res)=>{
      const cursor = cartproductCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    })



       //Put for updated 
       app.put('/product/:id', async(req, res) =>{
        const id = req.params.id;
        const filter ={_id: new ObjectId(id)}
        const options = {upsert: true};
        const updateProduct = req.body;
        const product ={
          $set: {
            name: updateProduct.name,
            brandName: updateProduct.brandName,
            price: updateProduct.price,
            shortDescription: updateProduct.shortDescription,
            rating: updateProduct.rating,
            fullDescription: updateProduct.fullDescription,
            photo: updateProduct.photo
  
          }
        }
        const result = await productCollection.updateOne(filter,product,options)
        res.send(result)
      })
  
      //Delete Cart Product
      app.delete('/cartproduct/:id', async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}

        const result = await cartproductCollection.deleteOne(query);
        res.send(result);
      })



    // Send a ping to confirm a successful connection
   
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res)=> {
res.send('AZ shop is running');
})

app.listen(port,()=> {
    console.log(`AZ shop server is running on port: ${port}`)
})



