usersController = require('../controllers/usersController');

exports.appRouter = router => {

    router.get('/', usersController.getUserController);

}; // end exports.appRouter