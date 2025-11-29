// const router = require('express').Router();
// const wasteReportController = require('../controllers/wasteReportController');

// router.get('/', wasteReportController.getWasteReports);
// router.post('/', wasteReportController.createWasteReport);

// module.exports = router;


const router = require('express').Router();
const wasteReportController = require('../controllers/wasteReportController');

router.get('/', wasteReportController.getWasteReports);
router.post('/', wasteReportController.createWasteReport);

module.exports = router;
