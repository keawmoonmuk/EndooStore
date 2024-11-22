const express = require('express');
const router =  express.Router();
const { authCheck, adminCheck } = require('../middleware/authCheck');
const { register , login , currentUser } = require('../controllers/auth');

router.post('/register',register)
router.post('/login', login)
router.post('/current-user' , authCheck, currentUser)
router.post('/current-admin' ,authCheck, adminCheck, currentUser)

//export router
module.exports = router