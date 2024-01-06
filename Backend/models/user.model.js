const mongoose=require('mongoose')

const User=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{
    collection:"user-details"
}
)

const model=mongoose.model('UserDetails',User);

module.exports=model;
