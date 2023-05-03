// node server.js
// npm run serve



// console.log("Hello");

const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Node API App is running on port 3000")
})

// routes
app.get('/', (req, res) => {
    res.send("Hello NODE API")
})



