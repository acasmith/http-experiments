//Whilst exploring HTTP module, I've accidently started making a *really* borked HTTP server.
//I want to know what's underlying express rather than just hacking around.

//Process:
//Check URL against files in parent directory.
//If match, chunk and write it to socket. Else, return 404.
//Currently doing everything synchronously to keep it simple, will refactor for asynch.

//TODO:
//Error handling in node, in this case so can throw 500 error back when read fails.
//Handle images.
//Refactor for asynch
//Create and server 404 and 500 error pages.

//Startup
console.log("Server up!")
const http = require('http');
const fs = require('fs');

//Create server, set listener and handler.
const server = http.createServer();
server.listen(8080, () => console.log("Listening on port 8080!"))
server.on('request', (message, response) => {
  console.log(message.url);
  fileContents = chunkFile(message.url)
  console.log(fileContents)
  if(fileContents){
    response.write(fileContents);
    console.log(response.statusCode);
  } else if(fileContents === -1){
    response.statusCode = 500;
    console.log(response.statusCode)
  } else{
    response.statusCode = 404;
    console.log(response.statusCode);
  }
  response.end();
})

//Reads in a file synchronously, returns a string of the file contents.
//Better to find a way to do a buffered read and write in chunks to response.
//This helps prevent eating memory if the hosted files are large.
function chunkFile(path){
  //Catch main page request or set path relative to current directory.
  if(path === '/'){
    path = "index.html"
  } else{
    path = "." + path;
  }

  //Check file existence, and read it in if it exists.
  //Try/catch doesn't work. Research how to error handle in node more.
  if(fs.existsSync(path)){
      const file = fs.readFileSync(path);
      return file;
  }
}
