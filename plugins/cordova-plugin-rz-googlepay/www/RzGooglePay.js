var exec = require('cordova/exec');

exports.pay = function (arg0, successCallback, errorCallback) {
    console.log("pay");
    exec(successCallback, errorCallback, 'RzGooglePay', 'pay', [arg0]);
};