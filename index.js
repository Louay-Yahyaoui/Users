const express = require('express');
const mongoose=require('mongoose');
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect("mongodb+srv://yylouay:h6GS@2tB2@bW3BW@cluster0.gh0basm.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
let userSchema=mongoose.Schema({username:String});
let User=mongoose.model("User",userSchema);
let exerciseSchema=mongoose.Schema({
  _id:String,
  description:{type:String,required:true},
  duration:{type:Number,required:true},
  date:String
})
let Exercise=mongoose.model("Exercise",exerciseSchema);
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.post('/api/users',(req,res)=>
{
  let username=req.body.username;
  let user=new User({"username":username});
  user.save((err,use)=>{
    res.json({"_id":use._id,"username":use.username});
  })
});
app.get('/api/users',(req,res)=>
{
  User.find((err,array)=>
  {
    res.send(array);
  });

});
app.post('/api/users/:_id/exercises',(req,res)=>
  {
    let id=req._id;
    let description=req.body.description;
    let duration=req.body.duration;
    let date=req.body.date;
    if (!date)
        date=new Date();
    else
        date=new Date(date);
    date=date.toDateString();
    if ((description)&&(duration))
    User.findById(id,(err,user)=>
    {
      if (err)
        console.log("error 1");
      if (!err)
      {
        var exercise=new Exercise({"_id":id,"description":description,
        "duration":duration,"date":date});
      exercise.save((err,ex)=>
        {
          if (err)
            console.log("error 2");
          if(!err)         res.json({"_id":user._id,"username":user.username,         "description":ex.description,"duration":ex.duration,"date":ex.date});
        }
      );
    }});
      });


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
