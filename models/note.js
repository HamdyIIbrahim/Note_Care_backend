const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        requied:true,
        unique:true
    },
    content:{
        type:String,
        requied:true
    },
    background:{
        type:String,
    },
    date:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
});
const noteModel =mongoose.model("Notes",noteSchema);
module.exports=noteModel;