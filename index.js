var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){

  socket.on('deleted', function(msg){
    io.emit('deleted', msg);
  });
});

var port = 3000;

server.listen(port, function(){
  console.log('listening on localhost:' + port)
});