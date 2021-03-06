const mongoose = require('mongoose');
const express = require('express');


const userRouter = require('./src/routers/patient');
const bookingRouter = require('./src/routers/booking');
const clinicRouter = require('./src/routers/clinicCenter');
const timeSlotRouter = require('./src/routers/timeSlots');


const MONGO_DB_URI = "mongodb+srv://reuben:reuben@mongodb.syifj.mongodb.net/vaccine_locator?retryWrites=true&w=majority"



const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const port = process.env.PORT

app.use(express.json())
app.use(userRouter);
app.use(clinicRouter);
app.use(bookingRouter);
app.use(timeSlotRouter);
//
// app.post('/center', async (req, res) => {
//     const clinic = new Clinic(req.body)
//     console.log(clinic)
//     try {
//         await clinic.save()
//         res.status(201).send({clinic})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })
//

mongoose.connect(MONGO_DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
})
    .then(res => {
        app.listen(4000);
        // app.listen(process.env.PORT || 5000)
    }).catch(err => {
    console.log(err);
});


// app.listen(3000, () => {
//     console.log('Server is on port '+3000)
// })
