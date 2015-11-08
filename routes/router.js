var express 	    = 	require('express');
var router 		    = 	express.Router(); 	// Use the express router module
var user 		    =	require('../controllers/user');
var features	    =	require('../controllers/features');

/***** USER ROUTES ***/
router.post('/upload', user.imageUpload);
router.get('/test', user.test);


/**** FEATURES ROUTES ****/
router.post('/recognition', features.recognition);
router.post('/searchResults', features.searchResults);
router.post('/ocr', features.ocr);

module.exports = router;	//Export it so that it can be included or called from some other file !!