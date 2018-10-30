const request = require('request');
<<<<<<< HEAD
// const endpoint = 'http://localhost:6653';
const endpoint = 'http://35.237.108.201:6653'

function getReqDetails(req) {
    function getReqDetail(headers, regex) {
        try {
            return headers.match(regex)[1].trim();
        } catch (err) {
            console.log(`error getting information from headers: ${headers}`);
            return "";
        }
    }

    const reqUserAgent = req.headers['user-agent'];

    return {
        ip: req.ip,
        userAgent: reqUserAgent,
        platform: getReqDetail(reqUserAgent, /\(([^;]+);/i),
        platformDetails: getReqDetail(reqUserAgent, /\([^;]+;([^)]+)\)/i),
        browser: getReqDetail(reqUserAgent, /(\w+)\/[0-9.]+$/i),
        timestamp: (new Date()).toString()
    }
}

function insertStatisticsInMongo(reqDetails) {
    // console.log(`req details: ${JSON.stringify(reqDetails, null, 4)}`);      // for testing
    // TODO: insert reqDetails in mongoDB
}

module.exports.renderIndex = function (application, req, res, order, numBlocks) {
    insertStatisticsInMongo(getReqDetails(req));

=======
const endpoint = 'http://localhost:6653';
// const endpoint = 'http://35.237.108.201:6653'

/*module.exports.renderIndex = function (application, req, res, order, numBlocks) {
>>>>>>> 0050e5a15d4ff89f213330d05434f73ed4200e67
    request(`${endpoint}/${order}/${numBlocks}`, (err, resp, body) => {
        body = JSON.parse(body);
        res.render("index", {
            blocks: body['blocks'],
            order: order,
            numBlocks: numBlocks
        });
    });
<<<<<<< HEAD
};

module.exports.renderStatistics = function (application, req, res) {
    insertStatisticsInMongo(getReqDetails(req));
    res.render("statistics");
};
=======
};*/

>>>>>>> 0050e5a15d4ff89f213330d05434f73ed4200e67
