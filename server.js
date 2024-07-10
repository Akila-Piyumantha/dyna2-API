require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/auth')
const cors = require('cors');



// Example for an Express.js backend
const cors = require('cors');
app.use(cors({
  origin: 'https://airdyna-client2-git-master-akila-piyumanthas-projects.vercel.app/', // or your frontend URL
  credentials: true,
})) 

//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use(express.json())
app.use(cors({
    origin:["https://airdyna-client2-git-master-akila-piyumanthas-projects.vercel.app/"],
    methods: ["GET","POST","DELETE","PATCH"],
    credentials:true
}))
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('connected to the db')})
.catch((error)=>{console.log(error)})

app.listen(process.env.PORT, ()=>
{
    console.log('listen on port ',process.env.PORT)
})
