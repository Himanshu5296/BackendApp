const express = require("express")
const userRouter = require("./Routes/user.routes")
const mongoose = require("mongoose")
const connection = mongoose.connect(`mongodb+srv://postsComments:postsComments@cluster0.eydculc.mongodb.net/?retryWrites=true&w=majority`)
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to App")
})

app.use(userRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)   
    }
    console.log("http://localhost:8080")
})
