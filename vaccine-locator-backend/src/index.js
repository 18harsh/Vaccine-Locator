const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
// const clinicRouter = require('./routers/clinicCenter')

const Clinic = require('./models/clinicCenter')

const app = express()
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

app.listen(port, () => {
    console.log('Server is on port '+port)
})