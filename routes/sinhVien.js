const express = require('express');
const router = express.Router();
const SinhVien = require('../models/sinhVienModel');
const JWT = require('jsonwebtoken');
const config = require("../util/config");

//1.Lấy danh sách sinh viên
router.get('/all', async (req, res) => {
  try {
    
    //vao header, authorization,Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzMyNTUzNzYzLCJleHAiOjE3MzI1NTM3OTN9.r85LlNyFmhNyQdpnyNXwjOIJ0-8hcfS-Fwmtf2qcraE
    const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: error.message });
      }else{
        const sinhViens = await SinhVien.find();
    res.json(sinhViens);
      }
    });
  }else{
    res.status(401).json({status: false,message: error.message});
  }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//2.Lấy toàn bộ danh sách sinh viên thuộc bộ môn
router.get('/get-ds/:mon', async (req, res) => {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if(token){
      JWT.verify(token, config.SECRETKEY, async function (err, id){
        if(err){
          res.status(403).json({status: false, message: error.message });
        }else{
          const { mon } = req.params;
    if (!mon) {
      return res.status(400).json({ message: 'Thiếu tham số bộ môn.' });
    }

    const sinhViens = await SinhVien.find({ boMon: mon });

    if (sinhViens.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên nào thuộc bộ môn này.' });
    }

    res.json(sinhViens);;
        }
      });
    }else{
      res.status(401).json({status: false,message: error.message});
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh viên:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.', error: error.message });
  }
});


//3.Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.5
router.get('/dtb/from/:from/to/:to', async (req, res) => {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if(token){
      JWT.verify(token, config.SECRETKEY, async function (err, id){
        if(err){
          res.status(403).json({status: false, message: error.message });
        }else{
          const {from,to}=req.params
          const sinhViens = await SinhVien.find({diemTrungBinh: { $gte: from, $lte: to }, });
          res.json(sinhViens);
        }
      });
    }else{
      res.status(401).json({status: false,message: error.message});
    }
    const {from,to}=req.params
    const sinhViens = await SinhVien.find({diemTrungBinh: { $gte: from, $lte: to }, });
    res.json(sinhViens);
  } catch (error) {
    await console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});

//4.Tìm kiếm thông tin của sinh viên theo MSSV
router.get('/sv/:mssv', async (req, res) => {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if(token){
      JWT.verify(token, config.SECRETKEY, async function (err, id){
        if(err){
          res.status(403).json({status: false, message: error.message });
        }else{
          const sinhVien = await SinhVien.findOne({ mssv: req.params.mssv });
    if (sinhVien) {res.json(sinhVien);
    } else {
      res.status(404).json({ message: 'Sinh viên không tồn tại1' });
    }
        }
      });
    }else{
      res.status(401).json({status: false,message: error.message});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//5.Thêm mới một sinh viên
router.post('/', async (req, res) => {
  const mssv = req.param('mssv');
  const hoTen = req.param('hoTen');
  const diemTrungBinh = req.param('diemTrungBinh');
  const boMon = req.param('boMon');
  const tuoi = req.param('tuoi');
  const sinhVien = new SinhVien({
    mssv,         
    hoTen,        
    diemTrungBinh,
    boMon,        
    tuoi          
  });

  try {
    const token = req.header("Authorization").split(' ')[1];
    if(token){
      JWT.verify(token, config.SECRETKEY, async function (err, id){
        if(err){
          res.status(403).json({status: false, message: error.message });
        }else{
          const newSinhVien = await sinhVien.save();
          res.status(200).json(newSinhVien);
        }
      });
    }else{
      res.status(401).json({status: false,message: error.message});
    }
    const newSinhVien = await sinhVien.save();
    res.status(200).json(newSinhVien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//6.Thay đổi thông tin sinh viên theo MSSV
router.put('/thaydoi/:mssv', async (req, res) => {
  try {
    const sinhVien = await SinhVien.findOneAndUpdate({ mssv: req.params.mssv },req.body,{new: true});
    if (sinhVien) {
      res.json(sinhVien);
    } else {
      res.status(404).json({ message: 'Sinh viên không tồn tại2' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//7.Xóa một sinh viên ra khỏi danh sách
router.delete('/maso/:mssv', async (req, res) => {
  try {
    const sinhvien = await SinhVien.findOneAndDelete({ mssv: req.params.mssv });
    if (!sinhvien) return res.status(404).json({ message: 'Sinh viên không tồn tại3' });
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//8.Lấy danh sách sinh viên thuộc BM CNTT và có DTB từ 9.0
router.get('/cntt/dtb/:diem', async (req, res) => {
  try {
    const {diem} = req.params
    const sinhViens = await SinhVien.find({
      boMon: 'CNTT',
      diemTrungBinh: { $gte: diem },
    });
    res.json(sinhViens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//9.Lấy danh sách sinh viên có độ tuổi từ 18 đến 20 thuộc CNTT và có điểm trung bình từ 6.5
router.get("/dssvtuoidiem", async function(req, res){
  try{
      const {boMon, tuoibd,tuoikt,dtb} = req.query;
      var list = await SinhVien.find({boMon: boMon, tuoi:{ $gte: tuoibd, $lte: tuoikt}, diemTrungBinh: {$gt: dtb}});
      
      res.status(200).json({status: true, message:"thanh cong", data: list});
  }catch(e){
      res.status(400).json({status: false, message:"co loi"});
  }
});
  

//10.Sắp xếp danh sách sinh viên tăng dần theo điểm trung bình
router.get('/sapxep/dtb', async (req, res) => {
  try {
    const sinhViens = await SinhVien.find().sort({ diemTrungBinh: 1 });
    res.json(sinhViens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//11.Tìm sinh viên có điểm trung bình cao nhất thuộc bộ môn bất kỳ
router.get('/:boMon/dtb/cao-nhat', async (req, res) => {
  try {
    const { boMon } = req.params;
    if (!boMon) {
      return res.status(400).json({ message: 'Tham số bộ môn là bắt buộc.' });
    }

    // Tìm sinh viên thuộc bộ môn, sắp xếp theo điểm trung bình giảm dần, lấy sinh viên cao nhất
    const sinhVien = await SinhVien.findOne({ boMon }).sort({ diemTrungBinh: -1 });
    if (!sinhVien) {
      return res.status(404).json({ message: `Không có sinh viên nào thuộc bộ môn "${boMon}".` });
    }
    res.json(sinhVien);
  } catch (error) {
    console.error('Lỗi khi tìm sinh viên:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.', error: error.message });
  }
});
module.exports = router;
