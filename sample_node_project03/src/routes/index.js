usersController = require('../controllers/usersController');
authController = require('../controllers/authController');
characterController = require('../controllers/characterController');
comicControler = require('../controllers/comicController');

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

    router.get('/get-comics', comicControler.getMarvelComics);

    router.post('/get-comic', comicControler.getMarvelComic);

    router.get('/get-characters', characterController.getMarvelCharacters);

    router.post('/get-character', characterController.getMarvelCharacter);

    router.get('/edit-user',
       [authJwt.verifyToken], 
       usersController.editUser);

    router.post('/edit-user',
       [authJwt.verifyToken], 
       usersController.upateUser);

}; // end exports.appRouter