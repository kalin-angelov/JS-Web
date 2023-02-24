const router = require('express').Router();

const { isAuthenticated, isAuthorized } = require('./middleware/authMiddleware');

const getControllers = require('./controllers/getControllers');
const crudControllers = require('./controllers/crudControllers');
const authControllers = require('./controllers/authControllers');

router.get('/', getControllers.getHomePage);
router.get('/catalog', getControllers.getCatalogPage);
router.get('/shared/:id', getControllers.getShared);
router.get('/profile', getControllers.getProfilePage);
router.get('/create', isAuthenticated, crudControllers.getCreatePage);
router.get('/delete/:id', crudControllers.deleteOffer);
router.get('/edit/:id', isAuthenticated, isAuthorized, crudControllers.getEditPage);
router.get('/details/:id', crudControllers.getDetailsPage);
router.get('/404', getControllers.get404Page);


router.get('/register', authControllers.getRegisterPage);
router.get('/login', authControllers.getLoginPage);
router.post('/register', authControllers.postRegister);
router.post('/login', authControllers.postLogin);
router.get('/logout', authControllers.getLogout);

router.post('/create', crudControllers.postCreate);
router.post('/edit/:id', crudControllers.postEdit);

module.exports = router;