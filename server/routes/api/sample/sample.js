var ninjaController = require('./../controllers/ninja.js');

module.exports = function(app) {
    // **** App Routes ****
    // Index Route - Show all Ninjas
    app.get('/ninja', ninjaController.index);
    // New Route - Show Form for adding new Ninja
    app.get('/ninja/new', ninjaController.new);
    // Create Route - Create New Ninja - Post route from New Route
    app.post('/ninja/new', ninjaController.create);
    // Show Route - Show Individual Ninja page
    app.get('/ninja/:id', ninjaController.show)
    // Edit Route - Show Edit Form for selected Ninja
    app.get('/ninja/edit/:id', ninjaController.edit  );
    // Update Route - Update Ninja Information - Post route for Edit Route
    app.post('/ninja/edit/:id', ninjaController.update );
    // Destroy Route - Remove Ninja by ID
    app.post('/ninja/destroy/:id', ninjaController.destroy );
}
