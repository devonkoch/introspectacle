var app = angular.module("chatApp", []);

app.factory('socket', function(){
  return io.connect('http://localhost:3000');
});

app.controller('ChatCtrl', function($scope, socket){
  $scope.messages = [];

  $scope.sendMessage = function(){
    socket.emit('send message', $scope.chat.message);
    $scope.chat.message = '';
  };

  socket.on('get message', function(data){
    $scope.messages.push(data);
    $scope.$digest(); });
})