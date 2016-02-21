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
        var clientId = '227G9R';
        var clientSecret = '1160e5090c6ded5e6bd5c56a60863b4f';
        var client = new FitbitClient(clientId, clientSecret);

        client.getToken(req.query.code, 'https://cl-pedrohernandez-fitbit-test.herokuapp.com/fitbit/callback')
                .then(function (token) {
                    // ... save your token on session or db ...
                    FitbitToken.create(token).exec(function (err, token) {});
                    // then redirect
                    //res.redirect(302, '/user');
                    res.send(token);
                })
                .catch(function (err) {
                    // something went wrong.
                    res.send(500, err);
                });


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

