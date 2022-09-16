const {Router} = require("express")
const axios = require("axios")
const User = require("../Models/user.models")
const userRouter = Router()

userRouter.post("/create/:username",async(req,res)=>{
    const {username} = req.params
    const person = await User.find({login:`${username}`})
    if(person){
        return res.status(201).send({messagee:"Data already present",person})
    }
    let response = await axios.get(`https://api.github.com/users/${username}`)
    let data = response.data
    
    const user = new User(data)
    await user.save()
    //console.log(username)
    return res.send({message:"User Data save in database",data})
 })

 userRouter.put("/update/:username",(req,res)=>{
    const {location,blog,bio} = req.body
    const {username} = req.params
    const user = User.findOneAndUpdate({login:`${username}`},{
        $set:{location:location,blog:blog,bio:bio}
    })

    return res.send({message:"data updated"})
 })

 userRouter.delete("/delete/:username",async(req,res)=>{
    const {username} = req.params
    const user = await User.findOneAndDelete({login:`${username}`})
    return res.send({message:"user data deleted"})
 })

 module.exports = userRouter