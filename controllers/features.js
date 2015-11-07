var AlchemyAPI = require('alchemy-api');									//Load the Alchemy module
var alchemy = new AlchemyAPI('32ea2d5da32811507997026cbd7bf395763c372b');	//Form the alchemy object to be used
//Load and require the bing module
var Bing = require('node-bing-api')({ accKey: "E568RZuTdwChVc9nBvcm9YYOnFA639izv4LLKWhsIA8" });		
var _ = require('underscore');

// Recognize the image uploaded
exports.recognition = function(req, res){

	alchemy.imageKeywords(req.body.imageURL, {}, function(err, response) {
	  if (err) throw err;

	  console.log(response);
	  // See http://www.alchemyapi.com/api/keyword/htmlc.html for format of returned object
	  var keywords = response.imageKeywords;
	  
	  res.json(keywords);
	});
}

exports.searchResults = function(req, res){

	Bing.web(req.body.keywords, {
	    top: 3  // Number of results (max 50) 	    
	  }, function(error, results, body){
	 
	 	if(error){
	 		res.status(400).send({
	            message: error
	        });
	 	}
	 		
	 	res.json(_.first(body.d.results, 3));
	  });

}