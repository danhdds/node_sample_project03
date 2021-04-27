usersController = require('../controllers/usersController.js');
authController = require('../controllers/authController.js');
characterController = require('../controllers/characterController.js');
comicControler = require('../controllers/comicController.js');

const { verifySignUp } = require('../middlleware/index');
const { authJwt } = require("../middlleware/index");

exports.appRouter = router => {

    router.get('/', usersController.renderMainUserPage);

    router.post('/signup',
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        authController.singUpNewUserController
    );

    router.post('/signin', authController.signinUserController);

    router.get('/edit-user',
        [authJwt.verifyToken],
        usersController.editUser);

    router.post('/edit-user',
        [authJwt.verifyToken],
        usersController.upateUser);

    router.get('/user-board-characters',
        [authJwt.verifyToken],
        usersController.getUserBoardCharactersController);

    router.get('/user-board-comics',
        [authJwt.verifyToken],
        usersController.getUserBoardComicsController);

    router.get('/get-comics', comicControler.getMarvelComics);

    router.post('/get-comic', comicControler.getMarvelComic);

    router.get('/get-characters', characterController.getMarvelCharacters);

    router.post('/get-character', characterController.getMarvelCharacter);

    router.post('/add-character-tofav',
        [authJwt.verifyToken],
        characterController.addCharacterToFavorites);

    router.post('/add-comic-tofav',
        [authJwt.verifyToken],
        comicControler.addComicToFavorites);

    router.get('/favorites',
        [authJwt.verifyToken],
        usersController.getUserFavoritesBoard);

    router.post('/user-fav-chars',
        [authJwt.verifyToken],
        usersController.getUserFavCharacters);

    router.post('/user-fav-comics',
        [authJwt.verifyToken],
        usersController.getUserFavComics);


}; // end exports.appRouter