//Server for the game.
//Experimenting with http module, I want to know what's underlying express a little rather than just hacking around.
console.log("Server up!")
const http = require('http')
const server = http.createServer()
server.listen(8080, () => console.log("Listening on port 8080!"))
server.on('request', (message, response) => {
  fileContents = chunkFile("index.html")
  response.write(fileContents);
  response.end();
})

const fs = require('fs')
//Better to find a way to do a buffered read and write in chunks to response.
//This helps prevent frontloading memory if the hosted files are large.
function chunkFile(path){
  const file = fs.readFileSync(path);
  console.log(file);
  return file;
}
