usersController = require('../controllers/usersController');
authController = require('../controllers/authController');
const { verifySignUp } = require('../middlleware/index');
const { authJwt } = require("../middlleware/index");

exports.appRouter = router => {

    router.get('/', usersController.renderMainUserPage);

    router.get('/user-board', 
        [authJwt.verifyToken], 
        usersController.getUserBoardController);

    router.post('/signup',
        [
          verifySignUp.checkDuplicateUsernameOrEmail
        ],
        authController.singUpNewUserController
    );

    router.post('/signin', authController.signinUserController);

}; // end exports.appRouter