const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

//type of files that we want to serve on our server

const mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg"  : "image/jpg",
	"png"  : "image/png",
	"js"   : "text/javascript",
	"css"  : "text/css",
};

http.createServer(function(req,res){
	var uri = url.parse(req.url).pathname;
	/*
	pathname is the path section of the URL, that comes after the host and before the query, including the initial slash if present.
	
	url.parse('http://stackoverflow.com/questions/17184791').pathname   
	
	will give you : "/questions/17184791"
	*/
	var filename = path.join(process.cwd(),unescape(uri));
	
	/*
	process.cwd() current working directory
	unescape(uri) computes a new string in which hexadecimal escape sequences are replaced with the character that it represents
	
	*/
	console.log('loding '+uri);
	var stats;
	
	try{
		stats = fs.lstatSync(filename); // get file information
	
	} catch(e){
		res.writeHead(404,{'Content-type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}
	
	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(filename).split(".").reverse()[0]]; //extname checks for the extension and we are splitting it after "."
		res.writeHead(200, {'Content-type' : mimeType});
		
		var fileStream = fs.createReadStream(filename);
		fileStream.pipe(res);
	} else if(stats.isDirectory()){
		res.writeHead(302,{'Location' : 'index.html'}); //redirect to location index.html
		res.end();
	} else {
		res.writeHead(500, {'Content-type' : 'text/plain'});
		res.write('500 Internal Error \n');
		res.end();
		}

}).listen(1337);
