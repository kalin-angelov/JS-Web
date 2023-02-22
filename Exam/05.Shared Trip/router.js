const router = require('express').Router();

const { isAuthenticated, isAuthorized } = require('./middleware/authMiddleware');

const getControllers = require('./controllers/getControllers');
const crudControllers = require('./controllers/crudControllers');
const authControllers = require('./controllers/authControllers');

router.get('/', getControllers.getHomePage);
router.get('/shared', getControllers.getSharedPage);
router.get('/create', isAuthenticated, crudControllers.getCreatePage);
router.get('/delete/:id', crudControllers.deleteProduct);
router.get('/edit/:id', isAuthenticated, isAuthorized, crudControllers.getEditPage);
router.get('/details/:id', getControllers.getDetailsPage);
router.get('/join/:id', getControllers.joinTrip);
router.get('/profile', getControllers.getProfilePage);
router.get('/404', getControllers.get404Page);


router.get('/register', authControllers.getRegisterPage);
router.get('/login', authControllers.getLoginPage);
router.post('/register', authControllers.postRegister);
router.post('/login', authControllers.postLogin);
router.get('/logout', getControllers.getLogout);

router.post('/create', crudControllers.postCreate);
router.post('/edit/:id', crudControllers.postEdit);

module.exports = router;