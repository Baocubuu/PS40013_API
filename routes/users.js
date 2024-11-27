var express = require('express');
var router = express.Router();

// lay danh sach user 
var username= require("../models/usermodles");
var usermodles = require('../models/usermodles');
const JWT = require('jsonwebtoken');
const config = require("../util/config");



router.get("/all", async function(req,res){
  var list = await username.find();
  res.json(list);

})

// lay thong tin chi tiet cua 1 user
//http://localhost:3000/users/detail?id=xxx
router.get("/detail",async function (req,res) {
  try {
    const{id}=req.query;
    var detail = await username.findById(id);
    if(detail){
      res.status(200).json(detail);
    }else{
      res.status(400).json({status:true,message:"Khong Tim Thay"});
    }
  } catch (e) {
    res.status(400).json({status:false,message:"Co loi xay ra"});

  
  }
  //lay danh sach user co tuoi lon hon x
  //http://localhost:3000/users/get-ds?tuoi=xx
router.get('/old', async function(req, res) {
  try {
    const {tuoi} = req.query;
    var list = await username.find({old: {$gt: tuoi}});
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({status: false, message: error.message});
  }
});
})

//login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await usermodles.findOne({ username: username, password: password });

    if (checkUser == null) {
      res.status(200).json({ status: false, message: "User và password không đúng" });
    } else {
      const token = JWT.sign({ username: username }, config.SECRETKEY, { expiresIn: '30s' });  
      const refreshToken = JWT.sign({ username: username }, config.SECRETKEY, { expiresIn: '1d' });  
      res.status(200).json({ status: true, message: "Đăng Nhập Thành Công", token: token, refreshToken: refreshToken });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: false, message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
