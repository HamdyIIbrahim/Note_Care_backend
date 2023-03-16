const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note");
const port = process.env.PORT || 5000;
const User = require('./models/user');
const bcrypt = require('bcrypt');
require("dotenv").config();

const saltRounds = 10;
let user ;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`${process.env.DB_CONNECTION}`).then(() => {
    console.log("connected");
}).catch(() => {
    console.log("can't connect");
});

app.get("/home", async (req, res) => {
    const allNotes = await Note.find({ userId : user}).exec();
    res.json({allNotes});
});
app.get("/home/:value", async (req, res) => {
    const searchData=req.params.value;
    const allNotes = await Note.find({ userId : user, title :{$regex:searchData ,$options:"i"}  }).exec();
    res.json({allNotes});
});
app.get("/editenode/:id", async (req, res) => {
    const Id = req.params.id;
    const note = await Note.findById(Id).exec();
    res.json({note});
});
app.get("/delete/:id", async (req, res) => {
    const Id = req.params.id;
    const note = await Note.findByIdAndRemove(Id);
    res.json("done");
});
app.put("/editenode/:id", async (req, res) => {
    const {title,content} =req.body;
    const Id = req.params.id;
    const note = await Note.findByIdAndUpdate(Id,{title:title,content:content});
    res.json({note});
});
app.post("/signup",async (req,res)=>{
    const {email ,password}=req.body;
    try {
        await User.create({
            email,
            password:bcrypt.hashSync(password, saltRounds)
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
})
app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const userDoc =await  User.findOne({email});
    const passOk=bcrypt.compareSync(password, userDoc.password);
    user=userDoc._id;
    res.json({passOk})

})

app.post("/createnote", async (req, res) => {
    const { title, content ,selector,cuurentDate } = req.body;
    const noteDoc = await Note.create({
        title,
        content,
        background:selector,
        date:cuurentDate,
        userId:user, 
    });
    res.json({ noteDoc });
});

app.listen(port);
