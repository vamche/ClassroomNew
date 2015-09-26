angular.module('starter.controllers', ['pickadate','ngMaterial','ngAria'])

.factory('myFactoryService',function($state){


    var homeworkData =[
    { id: 0, title: "Read chapter 9", subject: "English", batch: "X" },
    { id: 1, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 2, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 3, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 4, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 5, title: "Read chapter 9", subject: "English", batch: "X"  }
  ];
	var homework = { id: "", title: "sda", subject: "", batch: ""  };

    return{
        setData:function(str){
            homeworkData.push(str);
			$state.go('app.HomeworkScreen');
        },

        getData:function(){
            return homeworkData;
        },

		setHomeworkSelectedData:function(homeworkTable){

			if(homeworkTable == null){
				homework = { id: "", title: "sda", subject: "", batch: ""  };
			}else{
				homework = homeworkTable;
			}

        },

        getSelectedHoweworkData:function(){
		    console.log("2");
            return homework;
        }
    }


})

.factory('menuListService',function($state){


    var leftMenuList = [{  id: "HOME", title:"Home", icon:"ion-ios-home-outline", color:"energized", user:"parent,student,teacher"},
	                    {  id: "ATTENDANCE", title:"Attendance", icon:"ion-ios-calendar-outline",color:"calm", user:"parent,student,teacher"},
						{  id: "HOMEWORK", title:"Homework", icon:"ion-ios-book-outline", color:"assertive", user:"parent,student,teacher" },
						{  id: "RESULTS", title:"Results", icon:"ion-ios-list-outline", color:"balanced", user:"parent,student,teacher" },
						{  id: "FEE", title:"Fee", icon:"ion-social-usd-outline", color:"royal", user:"parent,student"},
						{  id: "CIRCULAR", title:"Circular", icon:"ion-ios-analytics-outline", color:"royal", user:"parent,student,teacher"},
						{  id: "ADD_RESULT", title:"Add Result", icon:"ion-ios-list-outline", color:"positive", user:"teacher"},
						{  id: "TIME_TABLE", title:"Timetable", icon:"ion-ios-list-outline", color:"light", user:"parent,student,teacher"},
						{  id: "TAKE_ATTENDANCE", title:"Take Attendance", icon:"ion-ios-compose-outline", color:"positive", user:"teacher" },
						{  id: "TIME_WEEKTABLE", title:"Week Timetable", icon:"ion-ios-list-outline", color:"energized", user:"parent,student,teacher"}
						];

	var rightMenuList = [];

    return{

        getLeftMenuList:function(){
            return {"leftMenuList": leftMenuList};
        },
        setLeftMenuList:function(list){
            leftMenuList = list;
        },
        getRightMenuList:function(){
            return {"rightMenuList": rightMenuList};
        },
        setRightMenuList:function(list){
            rightMenuList = list;
        }
    }


})




.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('attendanceCtrl', function($scope,dateFilter,$state) {
   var newDate = new Date();
   $scope.date = dateFilter(newDate, 'yyyy-MM-dd');//'2013-11-26';
   $scope.day = dateFilter(newDate,'dd');
   $scope.minDate = '2010-1-1';
   $scope.maxDate = '2050-12-30';
   $scope.disabledDates = [];
   $scope.attendanceInfo = [ { data: 'Sick Leave due to fever',date: '2015-06-26',type: 'absent'},
							{ data: 'Sick Leave due to fever',date: '2015-06-27',type: 'absent'},
							{ data: 'holiday Date',date: '2015-06-24' , type :'holiday'}
						];

	$scope.absentInfo = [ { data: 'Sick Leave due to fever',date: '2015-06-26'},
							{ data: 'Sick Leave due to fever',date: '2015-06-27'}
						];
  $scope.absentlists = [
    { title: 'Total No of Present Days',data: '22', id: 1 },
	{ title: 'Total No of Absent Days',data: '2', id: 2 },
    { title: 'Total No of Working days',data: '24', id: 3 }
  ];

   $scope.goToAbsentDaysDetail = function(absentlist) {
    if(absentlist.id == "2"){
		$state.go('app.absentDaysDetail');
	}
  };
  $scope.goBack = function(){
	$state.go('app.attendance');
  }

})
.controller('circular', function($scope,dateFilter,$state) {
   var newDate = new Date();
   $scope.date = dateFilter(newDate, 'yyyy-MM-dd');//'2013-11-26';
   $scope.day = dateFilter(newDate,'dd');
   $scope.minDate = '2010-1-1';
   $scope.maxDate = '2050-12-30';
   $scope.ISCHANGESTATUSCLCKED = true;
   $scope.model = "I am attending";
   $scope.modelStudent = "Parent attending";
   $scope.disabledDates = [];
    $scope.selectedCircularData  = "";
	$scope.selectedCircularDate = "";
   $scope.classInfo = [ {  name: "Select Class", items: ["X","IX","IIX"], selectedItem : "" }
						];

	$scope.CircularStatus = [ {  name: "I am attending",id :1},
	{  name: "May attend", id : 2},
	{  name: "I am not attending", id : 3 }
						];
	console.log("$scope.date " + $scope.date);
	$scope.circularInfo = [ { data: 'Parent - Teacher Conference',date: $scope.date ,id : 1},
							{ data: 'Fun Day',date: '2015-07-25' ,id :2},
							{ data: 'Annual Day',date: '2015-07-15' ,id :3}
						];
  $scope.PTMeetingInfo = [
    { Name: 'Student1',Status: 'Parent atttending', StudentId: 1 },
	{ Name: 'Student2',Status: 'Parent not atttending', StudentId: 2 },
    { Name: 'Student3',Status: 'May attend', StudentId: 3 }
  ];

   $scope.goToCircularDetail = function(MeetingInfo) {
	   if(MeetingInfo.id == "2"){
			$state.go('app.circularDetailsForTeacher');
	   }
	   else if(MeetingInfo.id == "1"){
		/* $scope.selectedCircular.push({
					data: MeetingInfo.data,
					date: MeetingInfo.date,
					id: MeetingInfo.id
				});			 */
		   $state.go('app.circularDetails');
	   }
	   else{
		 selectedCircularData =  MeetingInfo.id;
		  $scope.selectedCircularDate =  MeetingInfo.date;
		   $state.go('app.circularDetailsForStudent');
	   }
  };
  $scope.changeCircularStatus = function(){
	  $scope.ISCHANGESTATUSCLCKED = false;
  }
  $scope.updateCircularStatus = function(MeetingInfo){
	  $scope.ISCHANGESTATUSCLCKED = true;
	  if(MeetingInfo.id== "1"){
	    $scope.model = "I am attending";
		$scope.modelStudent = "Parent attending";
	  }
	  else if(MeetingInfo.id== "2"){
	   $scope.model = "May attend";
	   $scope.modelStudent = "Parent may attend";
	  }
	  else{
	   $scope.model = "I am not attending";
	   $scope.modelStudent = "Parent not attending";
	  }
  }
  $scope.goBack = function(){
	$state.go('app.circular');
  }

})

// feeCntrl
.controller('feeCntrl', function($scope,$state) {

  $scope.items = [
    { id: 0, title: "Term 1", month: "June",fee: "7000/-", status: "Paid" ,src:"img/fee.jpg"},
    { id: 1, title: "Term 2", month: "October", fee: "7000/-",status: "Not Paid",src:"img/fee.jpg"  },
    { id: 2, title: "Term 3", month: "January",fee: "7000/-", status: "Not Paid" ,src:"img/fee.jpg" }
  ];

})


.controller('HomeworkCtrl', function($scope,$state,myFactoryService,USER_DETAILS,$ionicPopup) {
   console.log("called homework");

   $scope.activeIndex = -1;



   $scope.addHomeworkScreen = function() {
	  console.log("+ click");
      $state.go('app.addHomework');
    };

    $scope.isTeacher = function() {
	 	var isTeacher = false;
	 	if(USER_DETAILS.userRole == "teacher"){
	 		isTeacher = true;
	 	}
	 	return isTeacher;
    };

    $scope.onFocus = function(index) {

    	console.log("index  " + index);
	 	//var itemElement = angular.element(document.querySelectorAll(".homeworkList"));
	 	$scope.activeIndex = index;
	 	//itemElement[index].addClass(".homeworkBG");
    };

    $scope.selectedClass = function(index){
    	var selectedClass = "";
    	if($scope.activeIndex == index){
    		selectedClass = "item-energized";
    	}
    	return selectedClass;
    }

    $scope.showDesc = function(index) {
	 	var isActive = false;
	 	if($scope.activeIndex == index){
	 		isActive = true;
	 	}
	 	return isActive;
    };



  	$scope.$on('$ionicView.beforeEnter', function(){
    	$scope.items = myFactoryService.getData();
    	$scope.activeIndex = -1;
  	});


    $scope.showPopup=function(){
    $scope.data={};
    var popupShow=$ionicPopup.show({
      title:'Homework',
      cssClass:'popupHome',
      templateUrl:'addHomework.html',
      scope:$scope,
      buttons:[{
        text: 'Cancel',
        type:'button-stable button-outline'
      },{
        text: 'Submit',
        type:'button-stable button-outline',
        onTap: function(e){
          if(!$scope.data.classData || !$scope.data.classname){
            e.preventDefault();
          }else{
            $state.go('app.HomeworkScreen');
          }
        }
      }]

    });
    popupShow.then(function(res) {
    console.log('Tapped!', res);
    });
    };



})

.controller('DashboardCtrl', function($scope,$state,USER_DETAILS, $ionicPopup) {
   console.log("USER_DETAILS.userName ---> " + USER_DETAILS.userName);
    $scope.username = "";
    $scope.$on('$ionicView.beforeEnter', function(){
    	 $scope.username  = USER_DETAILS.userName;
  	});

    $scope.showPopup=function(){
    $scope.data={};
    var popupShow=$ionicPopup.show({
      title:'Enter Class Details',
      cssClass:'popupDetails',
      templateUrl:'homeworkpopup.html',
      scope:$scope,
      buttons:[{
        text: 'Cancel',
        type:'button-stable button-outline'
      },{
        text: 'Next',
        type:'button-stable button-outline',
        onTap: function(e){
          if(!$scope.data.classData || !$scope.data.classname){
            e.preventDefault();
          }else{
            $state.go('app.HomeworkScreen');
          }
        }
      }]

    });
    popupShow.then(function(res) {
  console.log('Tapped!', res);
});
  };
})

.controller('AddHomeworkCtrl', function($scope,$state,myFactoryService) {
		  /*
		   * if given group is the selected group, deselect it
		   * else, select the given group


		   */
		  $scope.$on('$ionicView.enter', function() {
			 $scope.groups = [];
			 $scope.homework = myFactoryService.getSelectedHoweworkData();
			 console.log("called addhomework" + $scope.homework.title);
			 $scope.groups = [{  name: "Select Class", items: ["X","IX","IIX"], selectedItem : $scope.homework.batch },
							  {  name: "Select Subject", items: ["Maths","Science","English"], selectedItem : $scope.homework.subject }];

		  });

		  $scope.toggleGroup = function(group) {
			if ($scope.isGroupShown(group)) {
			  $scope.shownGroup = null;
			} else {
			  $scope.shownGroup = group;
			}
		  };
		  $scope.selectItem = function(group,item) {
			$scope.shownGroup.selectedItem = item;
			$scope.toggleGroup(group);
		  };
		  $scope.isGroupShown = function(group) {
			return $scope.shownGroup === group;
		  };
		   $scope.resetHomework = function(){
		    for(var i=0;i<$scope.groups.length;i++){
				$scope.groups[i]["selectedItem"] = "";
			}
			$scope.homework = { id: "", title: "", subject: "", batch: ""  };
			myFactoryService.setHomeworkSelectedData(null);
		  };
		  $scope.newItem = {};
		  $scope.addHomework=function(){

			 console.log("add homework"+$scope.homework.title);
			  if($scope.groups[0].selectedItem != "" && $scope.groups[1].selectedItem != "" && $scope.homework.title != ""){
					//myFactoryService.setHomeworkSelectedData($scope.homework.title);
					$scope.newItem = {
						id: Math.floor((Math.random() * 100) + 1),
						title: $scope.homework.title,
						subject: $scope.groups[1].selectedItem,
						batch: $scope.groups[0].selectedItem
					};

				   myFactoryService.setData($scope.newItem);
				   myFactoryService.setHomeworkSelectedData(null);
				   $state.go('app.HomeworkScreen');
			   }


		}

})

.controller('MenuCtrl', function($scope, $stateParams,$state,USER_DETAILS,menuListService) {

     $scope.LeftMenu = [];
     $scope.RightMenu = [];
	 $scope.ScreenID = "";

	 $scope.$on('$ionicView.beforeEnter', function(){
    	$scope.userRole = USER_DETAILS.userRole;
    	$scope.LeftMenu = menuListService.getLeftMenuList().leftMenuList;
	 	$scope.RightMenu = menuListService.getRightMenuList().rightMenuList;
	 });



	 $scope.routeToScreen = function(item){
	            var id = item.id;
				$scope.ScreenID = id;
				console.log(id);
				menuListService.setRightMenuList([]);
				if(id == "HOME"){
					$state.go('app.dashboard');
				}else if(id == "ATTENDANCE"){
					$state.go('app.attendance');
				}else if(id == "HOMEWORK"){
					menuListService.setRightMenuList([{  id: "HOME", title:"Home", icon:"ion-ios-home-outline", color:"energized", user:"parent,student,teacher"},
	                    {  id: "ATTENDANCE", title:"Attendance", icon:"ion-ios-calendar-outline",color:"calm", user:"parent,student,teacher"},
						{  id: "HOMEWORK", title:"Homework", icon:"ion-ios-book-outline", color:"assertive", user:"parent,student,teacher" }
						]);
					$state.go('app.HomeworkScreen');
				}else if(id == "TAKE_ATTENDANCE"){
					$state.go('app.takeAttendance');
				}else if(id == "RESULTS"){
					$state.go('app.addResult');
				}else if(id == "ADD_RESULT"){
					$state.go('app.addResult');
				}else if(id == "CIRCULAR"){
					$state.go('app.circular');
				}else if(id == "TIME_TABLE"){
					$state.go('app.todayTimetable');
				}else if(id == "TIME_WEEKTABLE"){
					$state.go('app.weekTimetable');
				}else if(id == "FEE"){
					$state.go('app.fee');
				}
    		};
    	$scope.showRightMenu = function(){
    		var show = true;
    		if($scope.RightMenu.length == 0){
    			show = false;
    		}
	 		return show;
		 };

	 console.log($scope.ScreenID);

})

.controller('ResultCtrl', function($scope,$state) {
			$scope.groups = [];

			$scope.groups = [{  name: "Select Class", items: ["X","IX","IIX"], selectedItem : "" },
							 {  name: "Select Division", items: ["DivA","DivB","DivC","DivD"], selectedItem : ""},
							 {  name: "Select Subject", items: ["Maths","Science","English","Hindi","Social"], selectedItem : "" },
							 {  name: "Select Student", items: ["Pooja","Narender","Rajesh","Vamsi","Padma","Rahul","Gokul","Ramki","Arun","Madhu"], selectedItem : ""}];

		  /*
		   * if given group is the selected group, deselect it
		   * else, select the given group
		   */
		  $scope.toggleGroup = function(group) {
			if ($scope.isGroupShown(group)) {
			  $scope.shownGroup = null;
			} else {
			  $scope.shownGroup = group;
			}
		  };
		  $scope.selectItem = function(group,item) {
			$scope.shownGroup.selectedItem = item;
			$scope.toggleGroup(group);
		  };
		  $scope.isGroupShown = function(group) {
			return $scope.shownGroup === group;
		  };
		   $scope.resetResult = function(){
			for(var i=0;i<$scope.groups.length;i++){
			  $scope.groups[i].selectedItem = "";
			}
			$scope.resultVal = "";
			$scope.shownGroup = null;
		  };

		$scope.addItems=function(){
		  if($scope.groups[0].selectedItem != "" && $scope.groups[1].selectedItem != "" && $scope.resultVal != ""){
				$scope.items.push({
					id: Math.floor((Math.random() * 100) + 1),
					title: $scope.resultVal,
					subject: $scope.groups[1].selectedItem,
					batch: $scope.groups[0].selectedItem
				});
			  $state.go('app.ResultScreen');
		   }
   }


  $scope.data = {
    showDelete: false
  };

  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };

  $scope.delete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

   $scope.addResult = function() {
      $state.go('app.addResult');
    };

  $scope.items = [
    { id: 0, title: "Read chapter 9", subject: "English", batch: "X" },
    { id: 1, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 2, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 3, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 4, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 5, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 6, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 7, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 8, title: "Read chapter 9", subject: "English", batch: "X"  },
    { id: 9, title: "Read chapter 9", subject: "English", batch: "X"  }
  ];

})


.controller('LoginCtrl', function($scope,$stateParams,$timeout,$state,$ionicPopup,USER_DETAILS) {
	  $scope.login = {username: "", password : ""};
	  $scope.loginText = "Login";
	  $scope.$on('$ionicView.beforeEnter', function(){
    	var btnElement;
	    var spinnerElement;
	      $scope.login = {username: "", password : ""};
		  spinnerElement = angular.element( document.querySelector( "#loginSpinner" ) );
		  btnElement = angular.element( document.querySelector( "#boxes" ) );
		  btnElement.addClass('.box');
		  btnElement.removeClass('box-change');
		  $scope.loginText = "Login";
		  btnElement.removeClass('box-animate');
		  spinnerElement.addClass('ng-hide');
  	   });

	  $scope.showAlert = function() {
			    var alertPopup = $ionicPopup.alert({
			    	title: "Login Error!",
 					template: "Please enter valid credentials",

			    });
			}

	  $scope.onLogin = function(){
	    var btnElement;
	    var spinnerElement;
	    USER_DETAILS.userName = $scope.login.username;

	    if($scope.login.username && $scope.login.password){
	    	if(USER_DETAILS.userName == 'parent'){
			    USER_DETAILS.userRole = 'parent';
	 		}else if(USER_DETAILS.userName == 'teacher')	{
	 			USER_DETAILS.userRole = 'teacher';
	 		}else if (USER_DETAILS.userName == 'student') {
	 			USER_DETAILS.userRole = 'student';
	 		}else{
	 			 $scope.showAlert();
	 			return;
	 		}
 		}else{
 			 $scope.showAlert();
 			return;
	    }
	    console.log("USER_DETAILS" + JSON.stringify(USER_DETAILS));

		spinnerElement = angular.element( document.querySelector( "#loginSpinner" ) );
		btnElement = angular.element( document.querySelector( "#boxes" ) );
		btnElement.removeClass('.box');
		  //btnElement.addClass('box-change');
		btnElement.addClass('box-change');
		   $scope.loginText = "";
		  spinnerElement.removeClass('ng-hide');
		$timeout(function(){ btnElement.addClass('box-animate');},6000);
		$timeout($scope.showDashboard,2000);

		};
	$scope.showDashboard = function(){
		$state.go('app.dashboard');
		};

 })

.controller('takeAttendance', function($scope,$state) {
			$scope.studentsOfBatch = [];
			$scope.groups = [];

			$scope.groups = [{  name: "Select Class", items: ["X","IX","IIX"], selectedItem : "" },
							 {  name: "Select Batch", items: ["Batch A","Batch B","Batch C"], selectedItem : "" }];
		  /*
		   * if given group is the selected group, deselect it
		   * else, select the given group
		   */
		  $scope.toggleGroup = function(group) {
			if ($scope.isGroupShown(group)) {
			  $scope.shownGroup = null;
			} else {
			  $scope.shownGroup = group;
			}

			if($scope.groups[0].selectedItem != "" && $scope.groups[1].selectedItem != ""){
				if($scope.listOfStudents)
				{
					var classVal = $scope.listOfStudents;
					var len = $scope.listOfStudents.length;
					for(var i=0;i<len;i++){
						var batchVal = classVal[i][$scope.groups[0].selectedItem];
						if(batchVal){
							var batchLength = batchVal.length;
							for(var k=0;k<batchLength;k++){
								var value1 = batchVal[k][$scope.groups[1].selectedItem];
								if(value1){
									$scope.studentsOfBatch = value1;
								}
							}
						}
					}
				}

			}
		  };
		  $scope.selectItem = function(group,item) {
			$scope.shownGroup.selectedItem = item;
			$scope.toggleGroup(group);
			$scope.absentList = [];
		  };
		  $scope.isGroupShown = function(group) {
			return $scope.shownGroup === group;
		  };
		   $scope.absentList = [];
		   $scope.studentAttendanceComments =[];
          $scope.clickItem = function($event,student,rollNo){
			    var checkbox = $event.target;
				if(checkbox.checked == true || checkbox.checked == false){
					var action = (checkbox.checked ? 'remove' : 'add');
					if (action == 'add') {
						 $scope.absentList.push({
							RollNo: rollNo
						});
					}
					if (action == 'remove') {
						$scope.absentList.splice($scope.absentList.indexOf(rollNo), 1);
					}
				}else{
					$state.go('app.addAttendanceComment');
				}

		  };
			$scope.saveAttendance = function(){
				console.log($scope.absentList);
			};

		    $scope.goBackToTakeAttendance = function(){
				$state.go('app.takeAttendance');
			}
			 $scope.addCommentsAttendance = function(){
				$state.go('app.takeAttendance');
			}

			  $scope.clearSearch = function() {
				$scope.data.searchQuery = '';
			  };

		    $scope.listOfStudents =[{
			"X":[
				{
					"Batch A":[
						{	Name : "Vamsi",
							RollNo:"U081"
						},
						{	Name : "Gokul",
							RollNo:"U082"
						},
						{	Name : "Naren",
							RollNo:"U083"
						},
						{	Name : "Rahul",
							RollNo:"U084"
						},
						{	Name : "Rajesh",
							RollNo:"U085"
						}
						]
				},
				{
					"Batch B":[
						{	Name : "Gayatree",
							RollNo:"U086"
						},
						{	Name : "Sita",
							RollNo:"U087"
						},
						{	Name : "Arun",
							RollNo:"U088"
						},
						{	Name : "Kiran",
							RollNo:"U089"
						},
						{	Name : "Amrita",
							RollNo:"U090"
						}
						]
				},
				{
					"Batch C":[
						{	Name : "Ranjitha",
							RollNo:"U091"
						},
						{	Name : "Karuna",
							RollNo:"U092"
						},
						{	Name : "Pankaj",
							RollNo:"U093"
						},
						{	Name : "Sandeep",
							RollNo:"U094"
						},
						{	Name : "Sanghu",
							RollNo:"U095"
						}
						]
				}
			]},
			{
			"IX":[
				{
					"Batch A":[
						{	Name : "Pooja",
							RollNo:"U096"
						},
						{	Name : "Padma",
							RollNo:"U097"
						},
						{	Name : "Pavitha",
							RollNo:"U098"
						},
						{	Name : "Ramki",
							RollNo:"U099"
						},
						{	Name : "Prakriti",
							RollNo:"U100"
						}]
				},
				{
					"Batch B":[
						{	Name : "Abhay",
							RollNo:"U101"
						},
						{	Name : "Abhishek",
							RollNo:"U102"
						},
						{	Name : "Rashu",
							RollNo:"U103"
						},
						{	Name : "Virendra",
							RollNo:"U104"
						},
						{	Name : "Mohan",
							RollNo:"U105"
						}]
				},
				{
					"Batch C":[
						{	Name : "Krishna",
							RollNo:"U106"
						},
						{	Name : "Radha",
							RollNo:"U107"
						},
						{	Name : "Anu",
							RollNo:"U108"
						},
						{	Name : "Raghu",
							RollNo:"U109"
						},
						{	Name : "Dilip",
							RollNo:"U110"
						}]
				}

			]},
			{
			"IIX":[

				{
				"Batch A":[
					{	Name : "Ram",
						RollNo:"U081"
					},
					{	Name : "Sita",
						RollNo:"U082"
					},
					{	Name : "Laxman",
						RollNo:"U083"
					},
					{	Name : "Ganesh",
						RollNo:"U084"
					},
					{	Name : "Mahesh",
						RollNo:"U085"
					}]
				},
				{
					"Batch B":[
						{	Name : "Ravi",
							RollNo:"U086"
						},
						{	Name : "Ankita",
							RollNo:"U087"
						},
						{	Name : "Aditi",
							RollNo:"U088"
						},
						{	Name : "Ruchika",
							RollNo:"U089"
						},
						{	Name : "Aishwariya",
							RollNo:"U090"
						}]
				},
				{
				"Batch C":[
					{	Name : "Neha",
						RollNo:"U091"
					},
					{	Name : "Meenu",
						RollNo:"U092"
					},
					{	Name : "Sonu",
						RollNo:"U093"
					},
					{	Name : "Kanhaiya",
						RollNo:"U094"
					},
					{	Name : "Madhu",
						RollNo:"U095"
					}]

				}
				]}];


});
