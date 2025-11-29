const router = require('express').Router();
const waterFilterController = require('../controllers/waterFilterController');
const auth = require('../middleware/authMiddleware');

// Public route - get all water filters
router.get('/', waterFilterController.getWaterFilters);

// Admin-only routes
router.post('/add', auth, waterFilterController.addWaterFilter);
router.put('/toggle-status/:id', auth, waterFilterController.toggleWaterFilterStatus);
router.put('/update-quality/:id', auth, waterFilterController.updateWaterFilterQuality);
router.delete('/delete/:id', auth, waterFilterController.deleteWaterFilter);

module.exports = router;
