require('cf-autoconfig');

var connect = require('connect');
var http = require('http');
var redis = require('redis');

var app = connect();
var client = redis.createClient();

var data = {
  hello: 'world',
  active: true
};

client.on('error', function (err) {
  console.log('Error: ' + err);
});

client.set('key:test:0', JSON.stringify(data), redis.print);

app.use(function (req, res) {
  client.get('key:test:0', function (err, reply) {
    if (err) {
      res.end('error');
    }
    // var replyData = JSON.parse(reply);
    res.end(reply);
  });
});

http.createServer(app).listen(3000);
