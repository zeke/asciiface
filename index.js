var http = require('http');
var fs = require('fs');
var cool = require('cool-ascii-faces');
var route = require('router')();

route.all(function(req, res) {

  var queryIndex = req.url.indexOf('?');
  var hash = queryIndex === -1 ? req.url.substr(1, req.url.length) : req.url.substr(1, queryIndex);
  var face;

  if (hash.length > 1) {
    face = new Buffer(hash, 'base64').toString('utf-8');
  } else {
    face = cool();
    hash = new Buffer(face).toString('base64');
  }

  res.writeHead(200, {"Content-Type": "text/html"});
  console.log(req.headers['user-agent']);

  if (req.headers['user-agent'].match(/curl/)) {
    // cURL
    res.write(face);
  } else {
    // Browser
    var html = fs.readFileSync("index.html", "utf8").toString().replace('{{FACE}}', face).replace('{{HASH}}', hash);
    res.write(html);
  }

  res.end();
});

http.createServer(route).listen(process.env.PORT || 5000);
