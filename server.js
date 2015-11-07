var express 			=	require('express');				//	Require or include the express framework in the project
var server				=	express() ;						//	make the server use express in the application
var bodyParser 			=	require('body-parser');			//	for parsing json requests
var multer 				=	require('multer');				//	Used for multipart requests (Form upload for profile picture etc)
var expressValidator	=	require('express-validator'); 	//	Includes the express validator library to the project
var router				=	require('./routes/router');

server.use(bodyParser.json()); 								//	for parsing application/json
server.use(expressValidator());								//	use validations
server.use(bodyParser.urlencoded({ extended: true })); 		//	for parsing application/x-www-form-urlencoded
server.use(express.static(__dirname + '/public'));
server.use(multer({
    dest: './public/uploads/',
    limits: {
        fieldNameSize: 50,
        files: 1,
        fields: 5,
        fileSize: 1024 * 1024
    },
    rename: function(fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() +'_'+Date.now();
    },
    onFileUploadStart: function(file) {
        //console.log('Starting file upload process.');
        if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'  && file.mimetype !== 'image/gif') {
            return false;
        }
    },
    inMemory: true 											//	This is important. It's what populates the buffer.
}));



server.use('/',router);

server.listen(3000);