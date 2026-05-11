const router = require('express').Router();
const foodCourtController = require('../controllers/foodCourtController');
const auth = require('../middleware/authMiddleware');

router.get('/', foodCourtController.getFoodCourts);
router.post('/add', auth, foodCourtController.addFoodCourt);
router.put('/toggle-status/:id', auth, foodCourtController.toggleFoodCourtStatus);
router.delete('/delete/:id', auth, foodCourtController.deleteFoodCourt);

module.exports = router;