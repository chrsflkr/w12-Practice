const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const path = require("path");
const port = 369;

app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
app.get("/images", (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/images.json`));
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));



app.post("/upload", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.image;
  uploadPath = `${__dirname}/../frontend/public/img/uploaded.jpg`

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);    

    res.json('File uploaded!');
  });
})











app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});




























// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const mediaTypes = {
// 	"html": "text/html",
// 	"jpeg": "image/jpeg",
// 	"jpg": "image/jpeg",
// 	"png": "image/png",
// 	"svg": "image/svg+xml",
// 	"json": "application/json",
// 	"js": "text/javascript",
// 	"css": "text/css",
// 	"csv": "text/csv",
// 	"mp3": "audio/mpeg",
// 	"mp4": "video/mp4",
// 	"oga": "audio/ogg",
// 	"ogv": "video/ogg",
// 	"pdf": "application/pdf",
// 	"weba": "audio/webm",
// 	"webm": "video/webm",
// 	"webp": "image/webp",
// 	"woff": "font/woff",
// 	"woff2": "font/woff2",
// 	"ttf": "font/ttf",
// 	"gif": "image/gif"
// };

// const server = http.createServer((req, res) => {

// 	const errorHTML = `
		
// 	<!DOCTYPE html>
// 	<html lang="en">
// 	<head>
// 		<meta charset="UTF-8">
// 		<meta http-equiv="X-UA-Compatible" content="IE=edge">
// 		<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 		<link rel="preconnect" href="https://fonts.googleapis.com"> 
// 		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
// 		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
// 		<style>
// 			body{
// 				padding: 0; margin: 0;
// 				font-family: 'Montserrat', sans-serif;
// 				font-weight: 800;
// 				background-color: #4343F9;
// 				color: #fff;
// 			}
// 			#root{
// 				width: 100%;
// 				height: 100vh;
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 				font-size: 21px;
// 			}
// 		</style>
// 		<title>Not here</title>
// 	</head>
// 	<body>
// 		<div id="root">Rise your gaze to the sky<br/>than a bit back to the URL bar<br/>and check that link again</div>
// 	</body>
// 	</html>
	
// 	`;
    
// 	let filePath = path.resolve(__dirname + '/../frontend' + req.url);
    
// 	fs.access(filePath, fs.constants.R_OK, (err) => {
// 	if(err){
// 		res.statusCode = 404;
// 		res.end(errorHTML);
// 	}else{
// 		if(fs.statSync(filePath).isDirectory()) {
// 			filePath += '/index.html';
// 		}
// 		fs.readFile(filePath, "binary", (err, data) => {
// 			if(err) {
// 				res.statusCode = 500;
// 				res.end(errorHTML);
// 			} else {
// 				let mediaType = mediaTypes[filePath.split('.').pop()];
      
// 				if (!mediaType) {
// 					mediaType = 'text/plain';
// 				}
// 				res.writeHead(200, { "Content-Type": mediaType });
// 				res.write(data, "binary");
// 				res.end();
// 			}
// 		});
// 	}
// 	});
// });

// server.listen(9000, "127.0.0.1", () => {
//     const addr = server.address();
// 		console.log(`http://${addr.address}:${addr.port}`);
// });