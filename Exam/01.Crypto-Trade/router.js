const router = require('express').Router();

const { isAuthenticated } = require('./middleware/authMiddleware');

const getControllers = require('./controllers/getControllers');
const postControllers = require('./controllers/postControllers');
const authControllers = require('./controllers/authControllers');

router.get('/', getControllers.getHomePage);
router.get('/catalog', getControllers.getCatalogPage);
router.get('/create', isAuthenticated, getControllers.getCreatePage);
router.get('/details/:offerId', getControllers.getDetailsPage);
router.get('/edit/:offerId', isAuthenticated, getControllers.getEditPage);
router.get('/delete/:offerId', getControllers.getDeletePage);
router.get('/search', isAuthenticated, getControllers.getSearchPage);
router.get('/404', getControllers.get404Page);
router.get('/logout', getControllers.getLogout);
router.get('/buy/:id', getControllers.getBuy);

router.get('/register', authControllers.getRegisterPage);
router.get('/login', authControllers.getLoginPage);
router.post('/register', authControllers.postRegister);
router.post('/login', authControllers.postLogin);

router.post('/create', postControllers.postCreate);
router.post('/edit/:offerId', postControllers.postEdit);

module.exports = router;