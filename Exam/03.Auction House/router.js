const router = require('express').Router();

const { isAuthenticated, isAuthorized } = require('./middleware/authMiddleware');

const getControllers = require('./controllers/getControllers');
const crudControllers = require('./controllers/crudControllers');
const authControllers = require('./controllers/authControllers');
const postControllers = require('./controllers/postControllers');

router.get('/', getControllers.getHomePage);
router.get('/create',isAuthenticated, crudControllers.getCreatePage);
router.get('/details/:id', getControllers.getDetailsPage);
router.get('/edit/:id',isAuthenticated, isAuthorized, crudControllers.getEditPage);
router.get('/404', getControllers.get404Page);
router.get('/browse', getControllers.getBrowsePage);
router.get('/closed', isAuthenticated, getControllers.getClosePage);
router.get('/owner',isAuthenticated, isAuthorized, getControllers.getOwnerPage);
router.get('/delete/:id',isAuthenticated, isAuthorized, crudControllers.deleteProduct);
router.get('/stop/:id',isAuthenticated, isAuthorized, getControllers.getStopAuction);

router.get('/register', authControllers.getRegisterPage);
router.get('/login', authControllers.getLoginPage);
router.post('/register', authControllers.postRegister);
router.post('/login', authControllers.postLogin);
router.get('/logout', getControllers.getLogout);

router.post('/create', crudControllers.postCreate);
router.post('/edit/:id', crudControllers.postEdit);
router.post('/bid/:id', postControllers.postBid);

module.exports = router;