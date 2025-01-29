const express = require('express');
const gadgetsControllers = require('../controllers/gadgetsControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.get('/', authControllers.verifyJWT, gadgetsControllers.getGadgets);
router.post('/', authControllers.verifyJWT, gadgetsControllers.addGadget);
router.post('/:id/self-destruct', authControllers.verifyJWT, gadgetsControllers.selfDestruct);
router.patch('/:id', authControllers.verifyJWT, gadgetsControllers.updateGadget);
router.delete('/:id', authControllers.verifyJWT, gadgetsControllers.decommissionGadget);

module.exports = router;    