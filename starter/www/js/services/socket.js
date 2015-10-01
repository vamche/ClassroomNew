angular.module('socket.controller', [])
.factory('socket',function(socketFactory){
	//Create socket and connect to http://chat.socket.io 
 	var myIoSocket = io.connect('http://chatclassroom.azurewebsites.net:80');

  	mySocket = socketFactory({
    	ioSocket: myIoSocket
  	});
  	
	return mySocket;
})