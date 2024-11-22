const express = require('express');
const router = express.Router();
const { create, list, remove} = require('../controllers/categorie')
const { authCheck , adminCheck} = require('../middleware/authCheck')

router.post('/category', authCheck, adminCheck,create)
router.get('/category', list)
router.delete('/category/:id',authCheck, adminCheck, remove)

//export module
module.exports = router;