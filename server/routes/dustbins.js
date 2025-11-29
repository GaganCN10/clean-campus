const router = require('express').Router();
const dustbinController = require('../controllers/dustbinController');

router.get('/', dustbinController.getDustbins);

module.exports = router;