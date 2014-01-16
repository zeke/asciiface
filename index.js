var http = require('http');
var fs = require('fs');
var cool = require('cool-ascii-faces')
var route = require('router')()

route.get('/', function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  console.log(req.headers['user-agent'])

  if (req.headers['user-agent'].match(/curl/)) {
    // cURL
    res.write(cool());
  } else {
    // Browser
    res.write(fs.readFileSync("index.html", "utf8").toString().replace('{{FACE}}', cool()))
  }

  res.end();
});

http.createServer(route).listen(process.env.PORT || 5000);