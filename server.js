const express =require('express')
const connectDB =require("./config/db")
const app =express()
const path =require('path')


//require route from api
const userRoute =require("./routes/api/users")
const authRoute =require("./routes/api/auth")
const postsRoute =require("./routes/api/posts")
const profileRoute =require("./routes/api/profile")



//connect db
connectDB()

//init middleware
app.use(express.json({extended:false}))

// app.get('/' ,(req,res)=>res.send('RUNNING API') )

//define route
app.use("/api/users" ,userRoute) 
app.use("/api/auth" ,authRoute) 
app.use("/api/posts" ,postsRoute) 
app.use("/api/profile" ,profileRoute) 

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.stattic('client/build'))
    app.get('*' ,(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build' ,'index.html'))
    })
}


//connection
const PORT =process.env.PORT || 5000;
app.listen(PORT ,()=>console.log(`server started on port ${PORT}`) )