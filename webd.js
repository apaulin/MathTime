var express = require("express");
var router = express.Router();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');



var webRoot = "./src";
var port = 8080;



//A sample GET request    
router.route("/stats").get(function(req, res) {
	console.log("Got a GET request");
    res.send(fs.readFileSync("results.json", "utf8"));
});    

//A sample POST request
router.route("/results").post(function(req, res, next) {
	console.log("Got POST Data " + req.body);
	fs.appendFile("./results.json",
                ",\n" + req.body, 
                "utf8",
				errorProcessing);
   res.send('Got Post Data');
   next();
   
});

var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/',router);
app.use('/',express.static(webRoot));

var errorProcessing = function(err)
{
	if (err) 
	{
		throw err;
	}
	else
	{
		console.log('The "data to append" was appended to file!');
	}
}

var expressServer = app.listen(port,function(){
	console.log("Express Started");
});





/*
var handleRequest = function(request, response)
{

    try 
	{
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
   } 
	catch(err) 
	{
        console.log(err);
	}
}
var server = http.createServer(handleRequest);
server.listen(8080, "apaulinlaptop");



var postResults = function(req, res)
{
	console.log("Got a results " + req.method + " " + req.body);
	res.send("POST REPLY");
}

var getStats = function(req, res)
{
	console.log("Got a GET request " + req.body);
	res.send("GET REPLY");
}

//app.post('/results', postResults);
//app.get('/stats', getStats);
*/


