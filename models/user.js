const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    }
});
const noteModel =mongoose.model("Users",noteSchema);
module.exports=noteModel;