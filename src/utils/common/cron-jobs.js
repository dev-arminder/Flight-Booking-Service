const cron = require('node-cron');
const { BookingService } = require('../../services');

function cancelBookingCron(){
  cron.schedule('* * * * *', async () => {
    await BookingService.cancelOldBookings();
  });
}

module.exports = { cancelBookingCron }