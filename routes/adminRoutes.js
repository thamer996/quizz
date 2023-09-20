const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin CRUD routes
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:AdminID', adminController.getAdmin);
router.put('/:AdminID', adminController.updateAdmin);
router.delete('/:AdminID', adminController.deleteAdmin);

module.exports = router;
