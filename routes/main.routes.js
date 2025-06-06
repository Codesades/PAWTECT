const express = require('express');
const router = express.Router();

// Tham gia 
router.get('/',(req,res)=>{
    res.render('pages/tham-gia');
});

// Login 
router.get('/login',(req,res)=>{
    res.render('pages/login');
});

// Sign up 
router.get('/register',(req,res)=>{
    res.render('pages/register');
});

// Adnin dashboard
router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard');
});

// Adnin quỹ đóng góp
router.get('/quy-dong-gop',(req,res)=>{
    res.render('admin/quy-dong-gop');
});

// Adnin nhận nuôi
router.get('/nhan-nuoi',(req,res)=>{
    res.render('admin/nhan-nuoi');
});

// Adnin chờ duyệt
router.get('/cho-duyet',(req,res)=>{
    res.render('admin/cho-duyet');
});
module.exports = router;