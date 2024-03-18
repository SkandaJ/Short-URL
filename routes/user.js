const express=require('express');
const {handleUserSignuUp, handleUserLogin}=require('../controllers/user')
const router=express.Router();
router.post('/', handleUserSignuUp);
router.post('/login', handleUserLogin);
router.post('/signup', handleUserSignuUp);
module.exports=router;