const jwt = require('jsonwebtoken');

module.exports = {
    'secret': 'AC308'
};

module.exports.verifyJWT = function (req) {
    const token = req.headers['x-access-token'];

    var ok;

    if (!token) return {status: 401, auth: false, token: null, message: 'No token provided.'};

    jwt.verify(token, this.secret, function (err, decoded) {
        if (err){
            ok = {status: 500, auth: false, token: null, message: 'Failed to authenticate token.'};
        }
        ok = {status: 200, auth: true, decoded: decoded.id};
    });

    return ok;
};
