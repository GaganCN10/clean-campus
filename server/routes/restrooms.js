const router = require('express').Router();
const restroomController = require('../controllers/restroomController');
const auth = require('../middleware/authMiddleware');

router.get('/', restroomController.getRestrooms);
router.post('/add', auth, restroomController.addRestroom);
router.put('/toggle-status/:id', auth, restroomController.toggleRestroomStatus);
router.delete('/delete/:id', auth, restroomController.deleteRestroom);

module.exports = router;