var fs 				=	require('fs');

exports.imageUpload = function(req, res) {
    var file = req.files.file,
        path = './public/uploads/';

    if(!file){
    	res.status(500);
		res.json({error : "Please select image properly"});
		return;
    }

    // Logic for handling missing file, wrong mimetype, no buffer, etc.

    var buffer = file.buffer, //Note: buffer only populates if you set inMemory: true.
        fileName = file.name;
    var stream = fs.createWriteStream(path + fileName);
    stream.write(buffer);
    stream.on('error', function(err) {
        //console.log('Could not write file to memory.');
        res.status(400).send({
            message: 'Problem saving the file. Please try again.'
        });
    });
    stream.on('finish', function() {
        //console.log('File saved successfully.');
        var data = {
        				file_name: fileName
        		   };
        
       	res.json(data);
        
    });
    stream.end();
    console.log('Stream ended.');
};

exports.test = function(req, res){
	res.json({test: 'reached'});
}