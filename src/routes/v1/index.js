const express = require('express');

const { BookingController} = require('../../controllers/index');
// const { createChannel } = express.Router('../../utils/messageQueue');

// const channel = await createChannel();
const bookingController = new BookingController();
const router = express.Router(); 


router.get('/info',(req, res)=>{
    return res.json({ message: 'Response from routers'});
})
// class BookingController{
//     create = async (req, res) => {
//         try {
//             const response = await bookingService.createBooking(req.body);
//             console.log("FROM BOOKING CONTROLLER", response);
//             return res.status(StatusCodes.OK).json({
//                 message: 'Successfully completed booking',
//                 success: true,
//                 err: {},
//                 data: response
//             })
//         } catch (error) {
//             console.log("FROM BOOKING CONTROLLER", error);
//             return res.status(error.statusCode).json({
//                 message: error.message,
//                 success: false,
//                 err: error.explanation,
//                 data: {}
//             });
//         }
//     }
// }



router.post('/bookings', bookingController.create);
router.post('/publish', bookingController.sendMessagetoQueue);

module.exports = router;