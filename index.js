const express = require('express');
const mongoose=require('mongoose');
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect("mongodb+srv://yylouay:h6GS@2tB2@bW3BW@cluster0.gh0basm.mongodb.net/userss?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
let userSchema=mongoose.Schema({username:String});
let User=mongoose.model("User",userSchema);
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
})
app.get('/api/users',(req,res)=>
{
  User.find((err,array)=>
  {
    if(err)
      res.json({"error":"no users probably"});
    else
      res.send(array);
  });

})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
