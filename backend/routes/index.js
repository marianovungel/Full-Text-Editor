var express = require('express');
var router = express.Router();
var userModel = require('../models/useModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const secret = "nexussecret"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/singUp', async (req, res) => {
  
  let { name, email, password, phone, username} = req.body;
  let emailCon = await userModel.findOne({ email: email});
  let phoneCon = await userModel.findOne({ phone: phone});

  if (emailCon) {
    return res.json({ sucess: false, message: "Email already exist!"})
  } else if (phoneCon) {
    return res.json({ sucess: false, message: "Phone number already exist!"})
  }else{
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
        if(err) throw err;
        let user = await userModel.create({
          username:username,
          nema: name,
          email:email,
          phone:phone,
          password:hash
        })
        res.json({ success: true, message: "User created seccessfully!", userId: user._id})
      });
    });
    
  }
  
});

router.post('/login', async (req, res) => {
  
  let { email, password} = req.body;
  let user = await userModel.findOne({ email: email});
  
  if (user) {
    bcrypt.compare(password, user.password, function(err, result){
      if(result){
        var token = jwt.sign({ email: user.email, userId: user._id }, secret);
        res.json({ success: true, message: "Login seccessfully!", userId: user._id, token: token})
      }else{
        return res.json({ sucess: false, message: "Invalid Password!"})
      }
    })
  }else{
    return res.json({ sucess: false, message: "Invalid Email!"}) 
  }

});



module.exports = router;
