angular.module('Chat.Controller', [])
.controller('ChatController',function($stateParams,socket,$sanitize,$ionicScrollDelegate,$timeout,$scope,$state) {
  	
  	var self=this;
  	var typing = false;
  	var lastTypingTime;
  	var TYPING_TIMER_LENGTH = 400;
	var Rooms = {};

  	//Add colors
  	var COLORS = [
	    '#e21400', '#91580f', '#f8a700', '#f78b00',
	    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	  ];

	 //initializing messages array
	self.messages=[];
    self.Groups={};
    self.listOfPeople = {};
  	socket.on('connect',function(){
  	  
  	  connected = true
  	  var peopleOnline = [];
	    socket.emit("joinserver", $stateParams.userName ,"desktop");
	    socket.emit("getOnlinePeople", function(data) {
		     console.log("room");
			 console.log(data.listOfGroups);
			 self.Groups = data.listOfGroups;
			 console.log(self.Groups);
			 //var chatMessage = data.chatMessages;
			 //for(var j=0; j< chatMessage.length;j++){
			//	addMessageToList(chatMessage[j].name,true,chatMessage[j].Message);
			 //}
			var inRoom;
			for(var i = 1 ; i <= data.sizeOnlinePeople ; i++){
				 //console.log(data.onlinePeople[i]);
				 inRoom = data.onlinePeople[i].inroom;
			}
			/*console.log(data.roomsSize);
			//for(var k = 0 ; k<data.roomsSize;k++){			
				var inRoomLength = inRoom.length;
				 for(var j = 0 ; j<inRoomLength;j++){
					var roomName = inRoom[j];
					Rooms[roomName] = {People:data.rooms[roomName].peopleName};
				 }
				
			//}*/
      });
	 
	 
  	  //Add user
  	  //socket.emit('add user', $stateParams.userName);

  	  // On login display welcome message
  	  socket.on('login', function (data) {
	    //Set the value of connected flag
	    self.connected = true
	    self.number_message= message_string(data.numUsers)
	  	
	  });

	  // Whenever the server emits 'new message', update the chat body
	  socket.on('new message', function (data) {
	  	if(data.message&&data.username)
	  	{
	   		addMessageToList(data.username,true,data.message)
	  	}
	  });

	  // Whenever the server emits 'user joined', log it in the chat body
	  socket.on('user joined', function (data) {
	  	addMessageToList("",false,data.username + " joined")
	  	addMessageToList("",false,message_string(data.numUsers)) 
	  });

	  // Whenever the server emits 'user left', log it in the chat body
	  socket.on('user left', function (data) {
	    addMessageToList("",false,data.username+" left")
	    addMessageToList("",false,message_string(data.numUsers))
	  });

	socket.on("isTyping", function(data) {
		if (data.isTyping) {
           if(data.person != $stateParams.userName){	
				addMessageToList(data.person,true," is typing");
		   }
		} else {
		  removeChatTyping(data.person);
		}
		});	
  	})

  	//function called when user hits the send button
  	self.sendMessage=function(flag){
  		//socket.emit('new message', self.message)
  		if(flag){
  			console.log("individual chat");
  			var TwoUsers = $stateParams.userName + ":" + $stateParams.messageTo;
  			socket.emit("send", new Date().getTime(), self.message,TwoUsers,flag);
  		}else{
			socket.emit("send", new Date().getTime(), self.message,$stateParams.groupName,flag);
		}
  		//addMessageToList($stateParams.userName,true,self.message);
  		socket.emit("typing", false);
  		self.message = ""
  	}
    
	socket.on("chat", function(msTime, person, msg,room) {
		console.log("chat "+room);
		console.log("$stateParams.groupName "+$stateParams.groupName);
		if(room == $stateParams.groupName){
			addMessageToList(person.name,true,msg);
		}
	});
	
  	//function called on Input Change
  	self.updateTyping=function(){
  		sendUpdateTyping()
  	}

  	// Display message by adding it to the message list
  	function addMessageToList(username,style_type,message){
  		username = $sanitize(username)
  		removeChatTyping(username)
  		var color = style_type ? getUsernameColor(username) : null;
		var side;//style_type ? "right" : "left";
		console.log("style_type " + style_type);
		if(username == $stateParams.userName){
		    side = "right";
			self.messages.push({content:$sanitize(message),style:style_type,username:"Me",color:color,align:side});
		}else{
		    side = "left";
			self.messages.push({content:$sanitize(message),style:style_type,username:username,color:color,align:side});
	    }
  		$ionicScrollDelegate.scrollBottom();
  	}

  	//Generate color for the same user.
  	function getUsernameColor (username) {
	    // Compute hash code
	    var hash = 7;
	    for (var i = 0; i < username.length; i++) {
	       hash = username.charCodeAt(i) + (hash << 5) - hash;
	    }
	    // Calculate color
	    var index = Math.abs(hash % COLORS.length);
	    return COLORS[index];
  	}

  	// Updates the typing event
  	function sendUpdateTyping(){
  		if(connected){
  			if (!typing) {
		        typing = true;
		        socket.emit("typing", true);
		    }
  		}
  		lastTypingTime = (new Date()).getTime();
  		$timeout(function () {
	        var typingTimer = (new Date()).getTime();
	        var timeDiff = typingTimer - lastTypingTime;
	        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
	          socket.emit("typing", false);
	          typing = false;
	        }
      	}, TYPING_TIMER_LENGTH)
  	}

	// Adds the visual chat typing message
	function addChatTyping (data) {   
			addMessageToList(data.person,true," is typing");
	}
	
	function getClassforUser(index){
		var me = $scope.messages[index].style;
		console.log("me ->" + me);
		var msgClass = "";
		
		if(!me){
			msgClass = "msgRight";
		}else{
			msgClass = "msgLeft";
		}
		console.log(" msgClass ---> " + msgClass);
		return msgClass;
	}
	

	// Removes the visual chat typing message
	function removeChatTyping (username) {
	  	self.messages = self.messages.filter(function(element){return element.username != username || element.content != " is typing"})
	}

  	// Return message string depending on the number of users
  	function message_string(number_of_users)
  	{
  		return number_of_users === 1 ? "there's 1 participant":"there are " + number_of_users + " participants"
  	}
	
  	$scope.listOfContact = function(){
  		$state.go('listOfGroupContacts',{userName:$stateParams.userName});
  		socket.emit('getContact',$stateParams.userName);

			//console.log(self.listOfPeople);
  	}

	$scope.clickGroup = function(name,flag){
		console.log(name);
		if(flag){
    		$state.go('groupChat',{userName:$stateParams.userName,groupName:name});	
			socket.emit('switchRoom',name);
		}else{
			$state.go('chat',{userName:$stateParams.userName,messageTo:name});	
			socket.emit('chatHistoryForTwoUser',$stateParams.userName,name);
		}
  	}
	$scope.goBack = function(){
		console.log(name);
    	$state.go('listOfGroupChat',{userName:$stateParams.userName});	
  	}
	$scope.goBackToGroupOfContacts = function(){
    	$state.go('listOfGroupContacts',{userName:$stateParams.userName});	
  	}


	$scope.goBackDashBoard = function(){
    	$state.go('app.dashboard');	
  	}
	socket.on('updatechat', function (username, data) {
		console.log("update chat");
	});

	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	/*socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});*/
	
	
	socket.on("history", function(data) {
	    console.log(data);
		for(var i in data){
			console.log(data[i].name + " "+data[i].message);
			addMessageToList(data[i].name,true,data[i].message);
		}
	});

	socket.on("returnListOfContact", function(getlistOfContacts,peopleOnlineFlag) {	
		var p = 0;

  		var people = [];
  		var contacts = [];
  		var flag;
			for(var i in getlistOfContacts){
				if(getlistOfContacts[i].listGroups){
					people = getlistOfContacts[i].listGroups
					for(var j = 0 ; j< people.length ; j ++){
						if(contacts.indexOf(people[j]) < 0 && people[j].toLowerCase() != $stateParams.userName.toLowerCase()){
							contacts[p] = people[j];
							flag = false;
							if(peopleOnlineFlag.indexOf(contacts[p]) >= 0){
								flag = true;
							}
							self.listOfPeople[p] = {"name" : contacts[p] , "online" : flag};
							p++;
						}

					
					}
				}
			}			

	});

socket.on("whisper", function(msTime, person, msg) {
    //$("#msgs").append("<li><strong><span class='text-muted'>" + timeFormat(msTime) + person.name + "</span></strong> "+s+": " + msg + "</li>");
    console.log(" person "+person.name +"  msg "+msg);
    if(person.name ==  $stateParams.userName || person.name == $stateParams.messageTo)
    	addMessageToList(person.name,true,msg);
  });
	
});

