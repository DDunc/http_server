'use strict';

var http = require('http');
var fs = require('fs');
var noteCount =  0;
var server = http.createServer(function(req, res) {
  req.on('data', function(data) {
    if(req.url === '/notes') {
      if(req.method === "POST"){
        var parsed = JSON.parse(data.toString());
        fs.writeFile(__dirname + '/notes/' + noteCount, data, function (err){
            if (err){
              return console.log(err);
            } else {
              console.log('posted data to note number ' + noteCount);
              noteCount++;
            }
        });
        return res.end();
      }
    }
  });
  var noteNum = parseInt(req.url.slice((req.url.lastIndexOf('/') + 1), req.url.length));
  if (req.url === '/notes/' + noteNum) {
    if(noteNum > noteCount) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("There is no note file here.");
      return process.nextTick(res.end());
    }

    if(req.method === "GET") {
      res.writeHead(200, {'Content-Type':  'application/json'});
      fs.readFile('./notes/' + noteNum, function read(err, data) {
        if (err) {
           return console.log(err);
        } else {
          res.write(data.toString());
          return res.end();
        }
      });
    }
  }
  res.on('end', function() {  //is this right at all
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("there is nothing here");
    process.nextTick(res.end());
  });

}); //server close bracket

server.listen(3000, function() {
  console.log('server up');
});