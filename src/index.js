const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT} =require('./config/serverConfig');
const ApiRoutes = require ('./routes/index');
const db = require('./models/index');

const setupAndStartServer = () =>{
 
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        // app.get('/bookingservice/api/v1/home',(req, res)=>{
        //     return res.json({message:'Hitting the booking services'});
        // })
        app.use('/bookingservice/api', ApiRoutes);

        app.listen(PORT, () => {
            console.log(`Server Started on port ${PORT}`);
            if (process.env.DB_SYNC){
                db.sequelize.sync({alert: true});
            }
            //console.log(typeof FLIGHT_SERVICE_PATH);
        });
}

setupAndStartServer();