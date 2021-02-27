const express = require('express')
require('./db/mongoose')


const app = express()
const port = process.env.PORT

app.use(express.json())

app.listen(port, () => {
    console.log('Server is on port '+port)
})