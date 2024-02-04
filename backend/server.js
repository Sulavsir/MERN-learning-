const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')

const userRouter = require('./routes/userRoutes')

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.URI) 
.then(()=> {
    console.log("connected successfully")
    app.listen(process.env.PORT || 8000, (err)=>{
        if(err) console.log(err);
        console.log("server running successfully at ", process.env.PORT)
    });
})
.catch((err=>{
    console.log("error",err)
}))

app.use('/api/user',userRouter);
