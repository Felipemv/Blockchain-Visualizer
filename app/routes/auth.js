const AuthController = require('../controllers/authController');
const jwtConfig = require('../../config/jwt');

module.exports = function (application) {

    application.get('/login', (req, res) => {
        res.render('login')
    });

    application.get('/logout', (req, res) => {
        res.status(200).send({auth: false, token: null});
    });

    application.post('/auth', (req, res) => {
            AuthController.login(req.body, function (resp) {
                res.status(resp.status).send(resp);
            });

    });

    application.post('/auth/register', (req, res) => {
        AuthController.insert(req, function (resp) {
            res.json(resp);
        })
    });

    application.get("/auth/list", (req, res) => {
        AuthController.getAll(function (resp) {
            res.json(resp);
        })
    });

    application.put("/auth/update/:id", function (req, res) {
        var userId = req.params.id;

        AuthController.update(userId, req.body, function (resp) {
            res.json(resp);
        });
    });

    application.delete("/auth/remove/:id", function (req, res) {
        var userId = req.params.id;

        AuthController.delete(userId, function (resp) {
            res.json(resp);
        })
    });
};
