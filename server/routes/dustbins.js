const router = require('express').Router();
const dustbinController = require('../controllers/dustbinController');
const auth = require('../middleware/authMiddleware');

router.get('/', dustbinController.getDustbins);
router.post('/add', auth, dustbinController.addDustbin);

// ✨ NEW: Admin-only route to delete dustbin
router.delete('/delete/:id', auth, dustbinController.deleteDustbin);

module.exports = router;
