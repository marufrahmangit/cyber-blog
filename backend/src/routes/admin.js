const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

// All admin routes require authentication
router.use(authMiddleware);
router.use(isAdmin);

router.get('/writeups', adminController.getAllWriteups);
router.get('/writeups/:id', adminController.getWriteupById);
router.post('/writeups', adminController.createWriteup);
router.put('/writeups/:id', adminController.updateWriteup);
router.delete('/writeups/:id', adminController.deleteWriteup);

module.exports = router;