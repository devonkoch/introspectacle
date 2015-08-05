var express = require('express'),
    app = express(),
    path = require('path');
    mongoose = require('mongoose');
    http = require('http').createServer(app),
    io = require('socket.io').listen(http),
    port = process.env.PORT || 3000;

http.listen(port);

mongoose.connect('mongodb://localhost/chat', function(err){
  if(err) {
    throw err;
  } else {
    console.log('SuccessDB');
  }
});

var messageSchema = mongoose.Schema({
  message: String,
  time: {type: Date, default: Date.now},
});

// model, pass in 'Message' since Mongoose automatically pluralizes
var Chat = mongoose.model('Message', messageSchema);

io.sockets.on('connection', function(socket){


    socket.on('send message', function(data){
        var newMessage = new Chat({message: data});
        newMessage.save(function(err){
          if(err){
            throw err;
          } else {
            io.sockets.emit('get message', data);
          }
        });
    })
})

// app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname+'/bower_components'));

app.use(app.router);

app.use(express.static(path.join(__.dirname, 'public')));

app.get('/file.txt', function(req, res){
  res.send('I am not a file');
});


app.get('/', function(req, res){
  res.send('welcome home!');
});

app.get('/user/:username', function(req, res){
  res.send(" "+req.params.username+" profile!");
});