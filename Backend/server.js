const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('./models/user.model')

const app=express();
app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/login-signup",{useNewUrlParser:true,useUnifiedTopology:true});
//signUp
app.post("/api/register",async(req,res)=>
    {
        console.log(req.body)
        try{
            const user=await User.create({
                name:req.body.name,email:req.body.email,
                password:bcrypt.hashSync(req.body.password,8)
            })
            res.status(200).json({
                status:"ok",user
            })
        }
        catch(err){
            res.status(201).json({
                status:err
            })
        }
    }
)

app.get("/",(req,res)=>(
    res.status(200).json(
        {
            msg:"Hello Sivaa"
        }
    )
)

)
//signIN
app.post("/api/login",async(req,res)=>
    {
        console.log(req.body)
        try{
            const user=await User.findOne({
                email:req.body.email,
            })
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){

                    res.status(200).json({status:"ok",user:{
                        id:user._id,
                        name:user.name,
                        email:user.email
                    }})
                }else{
                    res.status(401).json({status:"Invalid Username or Password"})
                }
            }
            else{
                res.status(401).json({status:"Invalid Username or Password"})
            }

        }
        catch(err){
            res.status(201).json({
                status:err
            })
        }
    }
)

app.listen(5000,()=>{
    console.log("App running at localhost 5000")
})
