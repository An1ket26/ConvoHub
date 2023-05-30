const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    mail:{type:String},
    password:{type:String},
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
});

module.exports=mongoose.model('User',userSchema);