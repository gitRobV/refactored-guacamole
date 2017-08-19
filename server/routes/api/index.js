var apiIndexController = require('./../../controllers/api/index.js');

module.exports = function(app) {
    // **** API Auth Routes ****
    // Index Route - Redirect to Register
    app.get('/api', apiIndexController.index);
    // Create User - Create User - Post route from Register Route
    app.post('/api/create', apiIndexController.create);
    // Authenticate Route - Authenticate user
    app.post('/api/auth', apiIndexController.auth  );
    // Authenticate Route - Authenticate user
    app.get('/api/auth-check', apiIndexController.checkAuth  );
    // Logut Route - Destroy User Session
    app.get('/api/logout', apiIndexController.logout );
}
