const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: process.env.API_KEY_SMS,
    apiSecret: process.env.API_SECRET_SMS
});

const sendSMS = (phone) => {
    
    vonage.verify.request({
        number: phone,
        brand: "Sunflower"
    },( error, result) => {
        if (error) {
            console.error(error);
        } else {
            const verifyRequestId = result.request_id;
            console.log('request_id', verifyRequestId);
        }
    });
}

module.exports = sendSMS;

// module.exports = {sendSMS, verifySMS};

// app.post('/verify', (req, res) => {
    
    //     const number = req.body.number;
    
    //     // Make a verification request
    //     vonage.verify.request({
    //         number: number,
    //         brand: "Sunflower"
    //       }, (err, result) => {
    //         if (err) {
    //           console.error(err);
    //         } else {
    //           const verifyRequestId = result.request_id;
    //           console.log('request_id', verifyRequestId);
    //         }
    //       });
    
    //       // Check the request with a code
    //       vonage.verify.check({
    //         request_id: REQUEST_ID,
    //         code: CODE
    //       }, (err, result) => {
    //         if (err) {
    //           console.error(err);
    //         } else {
    //           console.log(result);
    //         }
    //       });
    
    //       // Cancel The Request
    //       vonage.verify.control({
    //         request_id: REQUEST_ID,
    //         cmd: 'cancel'
    //       }, (err, result) => {
    //         if (err) {
    //           console.error(err);
    //         } else {
    //           console.log(result);
    //         }
    //       });
       
    // })
    
    