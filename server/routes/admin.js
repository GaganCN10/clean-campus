const router = require('express').Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/reports', authMiddleware, adminController.getAdminReports);
router.put('/clean/:id', authMiddleware, adminController.markAsClean);

module.exports = router;