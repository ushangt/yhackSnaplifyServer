var AlchemyAPI = require('alchemy-api');									//Load the Alchemy module
var alchemy = new AlchemyAPI('32ea2d5da32811507997026cbd7bf395763c372b');	//Form the alchemy object to be used
//Load and require the bing module
var Bing = require('node-bing-api')({ accKey: "E568RZuTdwChVc9nBvcm9YYOnFA639izv4LLKWhsIA8" });		
var _ = require('underscore');
var AZURE_COMPUTER_VISION_KEY = 'e00882281d154a27a545998b12082928';			//Define the AZURE key
var request = require('request');											//Require the Request library for making HTTP calls
var AYLIENTextAPI = require('aylien_textapi');								//Load the Aylien text API for summarization
var textapi = new AYLIENTextAPI({											//Define the Aylien key and application ID.
								  application_id: "24eb46db",
								  application_key: "2cb30942717ecc1eb439efbf53257878"
								});

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
	 	if(body.d.results.length > 3)	
	 		res.json(_.first(body.d.results, 3));
	 	else
	 		res.json(body.d.results);
	  });
}

exports.ocr = function (req, res){

	var postData = {
					  'Url' : req.body.imageURL
				   };

	var options = {

		url : 'https://api.projectoxford.ai/vision/v1/ocr?language=unk&detectOrientation=true',	
		headers: {													    
				    'Ocp-Apim-Subscription-Key': AZURE_COMPUTER_VISION_KEY
				 },	
		json: true,
		body: postData
	}

	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var words = _.pluck(response.body.regions[0].lines,'words')
	  	var text  = _.map(words,function(word){
				  								return _.pluck(word, 'text')
				  							  });
	  	var finalString = _.reduce(text, function( initial, current){
	  										return initial+" "+current
	  									}, "");
	  	textapi.summarize({
							  'text': finalString,
							  'mode' : 'short',
							  'title': 'Summary'
							}, function(error, response) {
							  if (error === null) {
							    console.log(response);
							    res.json({summary : response.sentences});
							  }
							  else{
							  	res.status(400).send({
						            error: error
						        });
							  }
						});
	    
	  }
	  else{
	  		res.status(400).send({
	            message: error
	        });
	  }
	}

	request.post(options, callback);
}