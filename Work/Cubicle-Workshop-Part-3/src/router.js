const router = require('express').Router();

const getControllers = require('./controllers/getControllers');
const postControllers = require('./controllers/postController');
const authControllers = require('./controllers/authControllers');
const { isAuthenticated } = require('./middleware/authMiddleware');

router.get('/', getControllers.getHomePage);
router.get('/create/cube', isAuthenticated, getControllers.getCreateCubePage);
router.get('/create/accessory', getControllers.getCreateAccessoryPage);
router.get('/details/:cubeId', getControllers.getDetailsPage);
router.get('/attach/:cubeId', getControllers.getAttachPage);
router.get('/about', getControllers.getAboutPage);
router.get('/404', getControllers.get404Page);
router.get('/edit/:cubeId', isAuthenticated, getControllers.getEditPage);
router.get('/delete/:cubeId', isAuthenticated, getControllers.getDeletePage);
router.get('/logout', getControllers.logout);


router.get('/login', authControllers.getLoginPage);
router.get('/register', authControllers.getRegisterPage);
router.post('/login', authControllers.postLogin);
router.post('/register', authControllers.postRegister);

router.post('/create/cube', postControllers.postCreateCube);
router.post('/create/accessory', postControllers.postCreateAccessory);
router.post('/attach/:cubeId', postControllers.postAttachAccessory);
router.post('/delete/:cubeId', postControllers.postDeleteCube);
router.post('/edit/:cubeId', postControllers.postEditCube);

module.exports = router;