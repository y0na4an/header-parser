var express = require('express');
var app = express();
var dns = require('dns');

app.use(express.static('public'));
var ip = "can't find address";
var val = "0.0.0.0";
app.get("/", function (request, response) {
  var os = request.headers["user-agent"].split("; ")[1]
  var language = request.headers["accept-language"].split(",")[0];
  //response.send(request.headers);
  if((request.headers["x-forwarded-for"]) === undefined)
  ip = request.headers['host'].split(':')[0];
  else
  ip = request.headers["x-forwarded-for"].split(",")[0];
	  //console.log(ip);
  dns.lookup(ip, (err, addresses) =>
  {console.log(addresses);
  	response.send({"ipaddress":addresses,"OS version":os,"language":language});
   });
  });
app.listen(3000);
