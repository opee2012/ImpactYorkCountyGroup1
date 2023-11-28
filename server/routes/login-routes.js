const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

const {
    getAllLogins,
    getUserLogin,
    loginUser,
    addNewLogin,
    updateLogin,
    deleteLogin
} = require('../controllers/login-controller');

module.exports = function(app) {

    // GET all logins
    app.get('/login', getAllLogins);

    // GET one login
    app.get('/login/:username', getUserLogin);

    // POST login user
    app.post('/login', loginUser);

    // POST login signup
    app.post('/signup', addNewLogin);

    // PUT one login
    app.put('/login/:targetUsername', updateLogin);

    // DELETE one login
    app.delete('/login/:username', deleteLogin);
};