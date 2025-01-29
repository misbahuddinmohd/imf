const express = require('express');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.post('/registerJWT', authControllers.registerJWT);

module.exports = router;