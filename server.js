//starts  backend, route handlers
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//initialize app and set port
const app = express();
const PORT = process.env.PORT || 5000;

//setting up middleware
app.use(express.json());
app.use(cors());

//connecting to mongodb using mongoose
mongoose.connect(process.env.MONGO_URI,{
    tlsAllowInvalidCertificates: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected'))
.catch(err => console.error(err));

//routing
app.get('/', (req,res)=>{
    res.send('Hi from express');
});

app.use('/api/requests',require('./routes/requests'));

//start server
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));

