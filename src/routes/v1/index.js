const expres = require('express');
const router = expres.Router();

const { InfoController } = require('../../controller/index');

const bookingRoutes = require('./booking-routes');

router.use('/bookings', bookingRoutes);
router.get('/info', InfoController.info);

module.exports = router