const cubeController = require('./controllers/cubeController');
const router = require('express').Router();
const control = require('./controllers/control');

router.get('/', cubeController.getCubeController);
router.get('/about', cubeController.getAboutController);
router.get('/create', cubeController.getCreateController);
router.get('/404', cubeController.getErrorController);
router.post('/create',control.inputControl, cubeController.postCubeController);
router.get('/details/:id', cubeController.getDetailsController);

module.exports = router;