'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {

  req.on('data', function(data) {
    if(req.url === '/greet') {
      if(req.method === "POST"){
        var parsed = JSON.parse(data.toString());
        console.log(parsed.name);
        res.writeHead(200, {'Content-Type':  'application/json'});
        res.write(JSON.stringify( {msg: "hello " + parsed.name}));
        return res.end();
      }
    }
  });

  var userName = req.url.slice((req.url.lastIndexOf('/') + 1), req.url.length);
  if(req.url === '/greet' + '/' + userName) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write("hello " + userName);
      return res.end();
  }

  if(req.url === '/time') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var today = new Date().toString();
      res.write(today);
      return res.end();
  }
  res.on('end', function() {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("there is nothing here");
    res.end();
  });

}); //server close bracket

server.listen(3000, function() {
  console.log('server up');
});