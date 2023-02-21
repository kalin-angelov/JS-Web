const router = require('express').Router();

const { isAuthenticated, isAuthorized } = require('./middleware/authMiddleware');

const getControllers = require('./controllers/getControllers');
const postControllers = require('./controllers/postControllers');
const crudControllers = require('./controllers/crudControllers');
const authControllers = require('./controllers/authControllers');

router.get('/', getControllers.getHomePage);
router.get('/catalog', getControllers.getCatalogPage);
router.get('/create', isAuthenticated, crudControllers.getCreatePage);
router.get('/edit/:id', isAuthenticated, isAuthorized, crudControllers.getEditPage);
router.get('/delete/:id', crudControllers.deleteProduct);
router.get('/details/:id', getControllers.getDetailsPage);
router.get('/404', getControllers.get404Page);
router.get('/apply/:id', getControllers.getApply);
router.get('/search', getControllers.getSearchPage);

router.get('/register', authControllers.getRegisterPage);
router.get('/login', authControllers.getLoginPage);
router.post('/register', authControllers.postRegister);
router.post('/login', authControllers.postLogin);
router.get('/logout', getControllers.getLogout);

router.post('/create', crudControllers.postCreate);
router.post('/edit/:id', crudControllers.postEdit);
router.post('/search', postControllers.postSearch);

module.exports = router;