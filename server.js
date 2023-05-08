// $ node server.js
// $ npm run serve
// $ npm run dev



// console.log("Hello");

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/productModel')

app.use(express.json())

// MongoDB database connection + node.js starts at port 3000
mongoose
    .connect('mongodb+srv://admin:0306@cluster0.6bxg1zu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log("Node API App is running on port 3000")
        })
    }).catch((error) => {
        console.log(error)
    });


// routes
app.get('/', (req, res) => {
    res.send("Hello NODE API")
})

app.get('/blog', (req, res) => {
    res.send("Hello BLOG")
})

// GET: Fetch all Products data from MongoDB database
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET: Fetch specified Product data from MongoDB database
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST: Save Product data to MongoDB database
app.post('/products', async (req, res) => {
    // console.log(req.body);
    // res.send(req.body);

    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// PUT: Update a Product in MongoDB database
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE: Delete a Product in MongoDB database
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})