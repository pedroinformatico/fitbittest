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
        sails.log("solicitud token", req.query);
        client.getToken(req.query.code, 'http://localhost:1337/fitbit/callback')
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
     * 
     * obtener codigos desde https://dev.fitbit.com/cl
     * 
     * ver documentacion https://github.com/thegameofcode/fitbit-client-oauth2
     */
    auth: function (req, res) {
        var FitbitClient = require('fitbit-client-oauth2');
        var clientId = '227G9R';
        var clientSecret = '1160e5090c6ded5e6bd5c56a60863b4f';
        var client = new FitbitClient(clientId, clientSecret);

        var auth_url = client.getAuthorizationUrl('http://localhost:1337/fitbit/callback');

        res.redirect(auth_url);
    },
    getDailyActivitySummary: function (req, res) {
        var FitbitClient = require('fitbit-client-oauth2');
        var clientId = '227G9R';
        var clientSecret = '1160e5090c6ded5e6bd5c56a60863b4f';
        var client = new FitbitClient(clientId, clientSecret);
        FitbitToken.find().exec(function (err, records) {
            sails.log(records);
            //res.send(records);
            client.getDailyActivitySummary(records[0], {date: "2016-02-21"})
                    .then(function (data) {
                        res.send(data);
                        //console.log('results: ', res);
                    }).catch(function (err) {
                //console.log('error getting user data', err);
            });
        });

    }
};

