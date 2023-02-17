const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
first_name:{type:String,required:true},
last_name:{type:String,required:true},
email:{type:String,required:true},
password:{type:(String,Number),required:true},
});


module.exports=mongoose.model("User",userSchema,"User");