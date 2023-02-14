const router = require('express').Router();

const getController = require('./controllers/getControllers');
const postController = require('./controllers/postController');

router.get('/', getController.getHomePage);
router.get('/login', getController.getLoginPage);
router.get('/register', getController.getRegisterPage);
router.get('/404', getController.get404Page);
router.get('/logout', getController.logout);

router.post('/register', postController.registerController);
router.post('/login', postController.loginController);

module.exports = router;
