const router = require('express').Router();

const getController = require('./controllers/getControllers');
const postController = require('./controllers/postControllers');

router.get('/', getController.getHomePageController);
router.get('/404', getController.getErrorPageController);
router.get('/about', getController.getAboutPageController);
router.get('/accessory/attach/:cubeId', getController.getAttachAccessoryPageController);
router.get('/create/cube', getController.getCreatePageController);
router.get('/create/accessory', getController.getCreateAccessoryPageController);
router.get('/cube/details/:cubeId', getController.getDetailsPageController);

router.post('/create', postController.postNewCubeController);
router.post('/create/accessory', postController.postNewAccessoryController);
router.post('/accessory/attach/:cubeId', postController.postAccessoryController);

module.exports = router;