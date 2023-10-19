
const express = require ('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//userName: AZ-Shop
//Pass: HjmmcLwEc54SIP1k

//MIDLEWARE
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://AZ-Shop:HjmmcLwEc54SIP1k@cluster0.b2stcle.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    await client.connect();


    const productCollection =client.db('productDB').collection('product');



  
    app.get('/product/:brandName', async (req, res) => {
      const brandName = req.params.brandName;
      const query = { brandName: brandName }; // Use the variable directly
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });




    app.post('/product', async(req, res) =>{
      const newProduct = req.body;
      console.log(newProduct)
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
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



