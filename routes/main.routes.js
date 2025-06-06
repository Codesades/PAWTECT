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
module.exports = router;