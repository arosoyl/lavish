const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: process.env.API_KEY_SMS,
    apiSecret: process.env.API_SECRET_SMS
});

// Make a verification request
const sendSMS = (phone) => {

    vonage.verify.request({
        number: phone,
        brand: "Sunflower"
    }, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            const verifyRequestId = result.request_id;
            console.log('request_id', verifyRequestId);
        }
    });
}
// Check the request with a code
const verifySMS = (request_id, code) => {
    vonage.verify.check({
        request_id: request_id,
        code: code
    }, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}


// Cancel The Request
const cancelSMS = (request_id) => {
    vonage.verify.control({
        request_id: REQUEST_ID,
        cmd: 'cancel'
    }, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}

module.exports = { sendSMS, verifySMS };





