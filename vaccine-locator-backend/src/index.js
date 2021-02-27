const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
// const clinicRouter = require('./routers/clinicCenter')

const Clinic = require('./models/clinicCenter')

const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
// app.use(clinicRouter)


app.post('/center', async (req, res) => {
    const clinic = new Clinic(req.body)
    console.log(clinic)
    try {
        await clinic.save()
        res.status(201).send({clinic})
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(3000, () => {
    console.log('Server is on port '+3000)
})
