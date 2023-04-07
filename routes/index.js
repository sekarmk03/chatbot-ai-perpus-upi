const express = require('express')
const router = express.Router()
const c = require('../controllers/index')

router.post('/', c.index);
router.post('/message', c.messages);

module.exports = router