// $ node server.js
// $ npm run serve
// $ npm run dev



// console.log("Hello");

const express = require('express')
const app = express()
const mongoose = require('mongoose');


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

