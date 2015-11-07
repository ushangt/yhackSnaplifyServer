var express 	    = 	require('express');
var router 		    = 	express.Router(); 	// Use the express router module
var user 		    =	require('../controllers/user');

/***** USER ROUTES ***/
router.post('/upload', user.imageUpload);

module.exports = router;	//Export it so that it can be included or called from some other file !!