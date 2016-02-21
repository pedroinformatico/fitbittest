/**
 * FitbitApiController
 *
 * @description :: Server-side logic for managing fitbitapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * `FitbitApiController.callBack()`
     */
    callBack: function (req, res) {
        var FitbitClient = require('fitbit-client-oauth2');
        var clientId = 'YOUR_CLIENT_ID';
        var clientSecret = 'YOUR_CLIENT_SECRET';
        var client = new FitbitClient(clientId, clientSecret);


    },
    /**
     * `FitbitApiController.auth()`
     */
    auth: function (req, res) {
        var FitbitClient = require('fitbit-client-oauth2');
        var clientId = '227G9R';
        var clientSecret = '1160e5090c6ded5e6bd5c56a60863b4f';
        var client = new FitbitClient(clientId, clientSecret);

        var auth_url = client.getAuthorizationUrl('https://cl-pedrohernandez-fitbit-test.herokuapp.com/fitbit/callback');

        res.redirect(auth_url);
    }
};

