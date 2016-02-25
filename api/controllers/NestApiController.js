/**
 * NestApiController
 *
 * @description :: Server-side logic for managing nestapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request-promise');
var nestConfig = {
    clientID: "a6677d47-85c4-408a-92af-c7de12d69bc4",
    clientSecret: "gwE9uMDFCb9u5A66VFLePSskB",
    authorizationURL: "https://home.nest.com/login/oauth2", //GET: ?client_id={{clientID}}&state=STATE
    tokenURL: "https://api.home.nest.com/oauth2/access_token"//POST :?client_id={{clientID}}&code={{authCode}}&client_secret={{clientSecret}}&grant_type=authorization_code
};

module.exports = {
    /**
     * `NestApiController.auth()`
     */
    auth: function (req, res) {
        var auth_url = nestConfig.authorizationURL + "?client_id=" + nestConfig.clientID + "&state=STATE";
        res.redirect(auth_url);
    },
    /**
     * `NestApiController.callback()`
     */
    callback: function (req, res) {
        sails.log("solicitud token nest", req.query);
        var options = {
            method: 'POST',
            uri: nestConfig.tokenURL,
            form: {
                client_id: nestConfig.clientID,
                code: req.query.code,
                client_secret: nestConfig.clientSecret,
                grant_type: "authorization_code"
            },
            json: true
        };
        request(options)
                .then(function (token) {
                    sails.log("solicitud token nest", token);
                    NestToken.create(token).exec(function (err, token) {});
                    res.send(token);
                    // POST succeeded... 
                })
                .catch(function (err) {
                    res.send(err); // POST failed... 
                });
    }
};

