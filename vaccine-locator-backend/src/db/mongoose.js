const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})