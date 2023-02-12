const router = require('express').Router();
const getController = require('./controllers/getController');
const postController = require('./controllers/postController');

router.get('/', getController.getHomePageController);
router.get('/cats/add-cat', getController.getAddCatController);
router.post('/cats/add-cat', postController.postNewCatController);
router.get('/cats/add-breed', getController.getAddBreedController);
router.post('/cats/add-breed', postController.postNewBreedController);
router.get('/edit/cat/:catId', getController.getCatInfoEditController);
router.get('/shelter/cat/:catId', getController.getCatInfoShelterController);
router.post('/edit/cat/:catId', postController.updateCatInfoController);
router.post('/shelter/cat/:catId', postController.shelterCatController);

module.exports = router;