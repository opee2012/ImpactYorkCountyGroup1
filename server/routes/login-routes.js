const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

const loginController = require('../controllers/login-controller');

module.exports = function(app) {

    // GET all logins
    app.get('/login', async (req, res) => {
        loginController.getAllLogins().then(function(logins) {
            res.status(HTTP_STATUS.OK).json(logins);
        }).catch(function(err) {
            console.error(`Error getting all logins: ${err}`);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ "error": err.message });
        });
    });

    // GET one login
    app.get('/login/:username', async (req, res) => {
        loginController.getUserLogin(req.params.username).then(function(login) {
            res.status(HTTP_STATUS.OK).json(login);
        }).catch(function(err) {
            console.error(`Error getting login: ${err}`);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ "error": err.message });
        });
    });

    // POST one login
    app.post('/login', async (req, res) => {
        loginController.addNewLogin(req.body).then(function(login) {
            res.status(HTTP_STATUS.CREATED).json(login);
        }).catch(function(err) {
            console.error(`Error creating login: ${err}`);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ "error": err.message });
        });
    });

    // PUT one login
    app.put('/login/:username', async (req, res) => {
        loginController.updateLogin(req.params.username, req.body).then(function(login) {
            res.status(HTTP_STATUS.OK).json(login);
        }).catch(function(err) {
            console.error(`Error updating login: ${err}`);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ "error": err.message });
        });
    });

    // DELETE one login
    app.delete('/login/:username', async (req, res) => {
        loginController.deleteLogin(req.params.username).then(function(login) {
            res.status(HTTP_STATUS.OK).json(login);
        }).catch(function(err) {
            console.error(`Error deleting login: ${err}`);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ "error": err.message });
        });
    });
};