const mongoose = require('mongoose')

const MONGO_DB_URI = process.env.MONGO_DB_CONNECTION_URL

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)

