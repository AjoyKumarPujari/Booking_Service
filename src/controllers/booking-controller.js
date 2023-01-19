const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const { createChannel, publisheMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');
const { json } = require('body-parser');

const bookingService = new BookingService();

class BookingController{
    
    constructor(){
        
    }

    async sendMessagetoQueue (req, res){
        const channel = await createChannel();
        const payload = {
            // message: 'Success',
            // service: 'DEMO_SERVICE'
            data: {
                subject: 'This is a notification from queue',
                content: 'Some queue will subscribe this',
                recepientEmail: ' bookingservice1001@gmail.com',
                notificationTime: '2023-01-08 23:30:00'
            },
            service: 'CREATE_TICKET'
        };
        publisheMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(200).json({
            message: 'Successfully Published the event'
        });
    }
    

    async create (req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER", response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            console.log("FROM BOOKING CONTROLLER", error);
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController