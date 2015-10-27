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
						{  id: "EXAM_SCHEDULE", title:"Exam Schedule", icon:"ion-ios-compose-outline", color:"positive", user:"parent,student,teacher" },
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
.controller('examScheduleCntrl', function($scope,dateFilter,$state) {
	var newDate = new Date();
	$scope.date = dateFilter(newDate, 'yyyy-MM-dd');//'2013-11-26';
	$scope.day = dateFilter(newDate,'dd');
	$scope.minDate = '2010-1-1';
	$scope.maxDate = '2050-12-30';
})
.controller('circular', function($scope,dateFilter,$state,$ionicSlideBoxDelegate) {
   var newDate = new Date();
   $scope.date = dateFilter(newDate, 'yyyy-MM-dd');//'2013-11-26';
   $scope.day = dateFilter(newDate,'dd');
   $scope.minDate = '2010-1-1';
   $scope.maxDate = '2050-12-30';
   $scope.ISCHANGESTATUSCLCKED = true;
  $scope.model = "I AM ATTENDING";
   $scope.modelStudent = "PARENT ATTENDING";
   $scope.disabledDates = [];
    $scope.selectedCircularData  = "";
	$scope.selectedCircularDate = "";
   $scope.classInfo = [ {  name: "Select Class", items: ["X","IX","IIX"], selectedItem : "" }
						];
	$scope.CircularStatus = [ {  name: "I AM ATTENDING",id :1},
	{  name: "May attend", id : 2},
	{  name: "I am not attending", id : 3 }
						];
	$scope.circularInfo = [ { data: 'Parent - Teacher Conference',image: 'img/circular.jpg',date: $scope.date ,id : 1},
							{ data: 'Fun Day',date: '2015-07-25' ,image: 'img/circular.jpg',id :2},
							{ data: 'Annual Day',date: '2015-08-15' ,image: 'img/circular.jpg',id :3}
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
				$scope.date = dateFilter(newDate, 'yyyy-MM-dd');
				//$ionicSlideBoxDelegate.slide(1);
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
 $scope.nextSlide = function(){
		//alert($scope.circularInfo[$ionicSlideBoxDelegate.currentIndex()].date);
		$scope.date = dateFilter($scope.circularInfo[$ionicSlideBoxDelegate.currentIndex()].date, 'yyyy-MM-dd');
		console.log("clc");
		$ionicSlideBoxDelegate.next();
   };
   $scope.previousSlide = function(){
		$scope.date = dateFilter($scope.circularInfo[$ionicSlideBoxDelegate.currentIndex()].date, 'yyyy-MM-dd');
		$ionicSlideBoxDelegate.previous();
   };  
})

// feeCntrl
.controller('feeCntrl', function($scope,$state) {

  $scope.items = [
    { id: 0, title: "Term 1", month: "Paid on Jan 11", status: "Paid" ,src:"img/fee.jpg"},
    { id: 1, title: "Term 2", month: "Paid on Feb 05", status: "Paid",src:"img/fee.jpg"  },
    { id: 2, title: "Term 3", month: "Paid on Mar 15", status: "Paid" ,src:"img/fee.jpg" },
	{ id: 2, title: "Term 4", month: "Last date Jul 15", status: "" ,src:"img/fee.jpg" }
  ];
  
  $scope.details = [
    { id: 0, title: "Total term fees", fee:"$5000"},
    {id: 1, title: "Total paid", fee:"$4000"  },
    { id: 2, title: "Due", fee:"$1000" }
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
        type:'button-stable button-clear'
      },{
        text: 'Submit',
        type:'button-clear',
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
    $scope.selectedClassInfo = {class:"",sections:["A","B","C"],subjects:""};
    $scope.selectedDetails = {class:"",section:"",subject:""};
    $scope.userDetails = {};
    $scope.selectedModule = {};
    $scope.modules = [{module: "ATTENDANCE", moduleTitle: "Attendance", bgColor: "#21D3D7"},
                      {module: "HOMEWORK", moduleTitle: "Homework", bgColor: "#FFAA01"},
                      {module: "RESULTS", moduleTitle: "Exam results", bgColor: "#61D397"},
                      {module: "FEEDBACK", moduleTitle: "Feedback", bgColor: "#CCB14A"}
                      ];




    $scope.$on('$ionicView.beforeEnter', function(){
    	 $scope.username  = USER_DETAILS.userName;
       $scope.userDetails = USER_DETAILS;
       $scope.selectedDetails = {class:"",section:"",subject:""};
       $scope.selectedClassInfo = {class:"",sections:["A","B","C"],subjects:""};
  	});

    $scope.onSelectClass = function(){
      console.log($scope.userDetails.classesInfo.length);
      
      for(var i=0; i < $scope.userDetails.classesInfo.length; i++){
        console.log($scope.selectedDetails.class + " i " + i);
        console.log("i >> " + $scope.userDetails.classesInfo[i]["class"]);
        if($scope.selectedDetails.class == $scope.userDetails.classesInfo[i]["class"]){
            $scope.selectedClassInfo = $scope.userDetails.classesInfo[i];
            console.log(JSON.stringify($scope.selectedClassInfo));
            return $scope.selectedClassInfo;
        }
      }
    }

    $scope.goTo = function(module){
          if(module == "ATTENDANCE"){
              $state.go('app.attendance');
             }else if(module == "CIRCULAR"){         
              $state.go('app.circular');
             }else if(module == "TIME_TABLE"){
               $state.go('app.todayTimeTable');
             }else if(module == "NOTIFICATION"){
               $state.go('app.addResult');
             }else if(module == "CHAT"){
              $state.go('listOfGroupChat',{userName:$scope.username});
             }
    }

    $scope.showPopup=function(module){
      if($scope.userDetails.userRole == "teacher"){

        $scope.selectedDetails = {class:"",section:"",subject:""};

        for(var i=0; i < $scope.modules.length; i++){
          if(module == $scope.modules[i]["module"]){
              $scope.selectedModule = $scope.modules[i];
              break;
          }

        }



        var popupShow=$ionicPopup.show({

                                      cssClass:'popupDetails',
                                      templateUrl:'homeworkpopup.html',
                                      scope:$scope,
                                      buttons:[{
                                        text: 'Cancel',
                                        type:'button-stable button-clear'
                                      },{
                                        text: 'Next',
                                        type:'button-clear',
                                        onTap: function(e){
                                                            if(!$scope.selectedDetails.class && !$scope.selectedDetails.section && !$scope.selectedDetails.subject){
                                                              e.preventDefault();
                                                            }else{
                                                               if(module == "ATTENDANCE"){
                                                                  $state.go('app.attendance');
                                                                }else if(module == "HOMEWORK"){         
                                                                  $state.go('app.HomeworkScreen');
                                                                }else if(module == "RESULTS"){
                                                                  $state.go('app.addResult');
                                                                }
                                                            }
                                                          }
                                          }]

          });
        popupShow.then(function(res) {
                                      console.log('Tapped!', res);
                                      });
      }else{
          if(module == "ATTENDANCE"){
            $state.go('app.attendance');
          }else if(module == "HOMEWORK"){         
            $state.go('app.HomeworkScreen');
          }else if(module == "RESULTS"){
            $state.go('app.addResult');
          }
      }   


    
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

.controller('MenuCtrl', function($scope, $stateParams,$state,$ionicSlideBoxDelegate,USER_DETAILS,menuListService) {

     $scope.LeftMenu = [];
     $scope.RightMenu = [];
	 $scope.ScreenID = "";

	 $scope.$on('$ionicView.beforeEnter', function(){
    	$scope.userRole = USER_DETAILS.userRole;
    	$scope.LeftMenu = menuListService.getLeftMenuList().leftMenuList;
	 	$scope.RightMenu = menuListService.getRightMenuList().rightMenuList;
	 });

   $scope.nextSlide = function(){
      $ionicSlideBoxDelegate.next();
   }


   $scope.previousSlide = function(){
      $ionicSlideBoxDelegate.previous();
   }

   $scope.showLeftArrow = function(){
      var show = true;
      if($ionicSlideBoxDelegate.currentIndex() == 0){
        show = false;
      }
      return show;
   }

   $scope.showRightArrow = function(){
      var show = true;
      if($ionicSlideBoxDelegate.currentIndex() == $ionicSlideBoxDelegate.slidesCount()-1){
        show = false;
      }
      return show;
   }

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
					//$state.go('app.feedbackDetails');
					$state.go('app.addResult');
				}else if(id == "ADD_RESULT"){
					$state.go('app.addResult');
				}else if(id == "CIRCULAR"){
					$state.go('app.circular');
				}else if(id == "EXAM_SCHEDULE"){
					$state.go('app.examSchedule');
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
	    var parents = ["parent","aish","aditi"];
		  var teachers = ["teacher","vamsi","pooja"];	
      var students = ["student","abhay","gokul"];
		
	    if($scope.login.username && $scope.login.password){
	    	if(parents.indexOf(USER_DETAILS.userName) != -1){
			    USER_DETAILS.userRole = 'parent';
	 		}else if(teachers.indexOf(USER_DETAILS.userName) != -1)	{
	 			USER_DETAILS.userRole = 'teacher';
	 		}else if (students.indexOf(USER_DETAILS.userName) != -1) {
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

.controller('takeAttendance', function($stateParams,$scope,$state) {
			
      $scope.activeIndex = -1;

      $scope.$on('$ionicView.beforeEnter', function(){
          $scope.activeIndex = -1;
      });

      $scope.listOfStudents =[{
      "X":[
        {
          "A":[
            { Name : "Vamsi",
              RollNo:"U081"
            },
            { Name : "Gokul",
              RollNo:"U082"
            },
            { Name : "Naren",
              RollNo:"U083"
            },
            { Name : "Rahul",
              RollNo:"U084"
            },
            { Name : "Rajesh",
              RollNo:"U085"
            }
            ]
        },
        {
          "B":[
            { Name : "Gayatree",
              RollNo:"U086"
            },
            { Name : "Sita",
              RollNo:"U087"
            },
            { Name : "Arun",
              RollNo:"U088"
            },
            { Name : "Kiran",
              RollNo:"U089"
            },
            { Name : "Amrita",
              RollNo:"U090"
            }
            ]
        },
        {
          "C":[
            { Name : "Ranjitha",
              RollNo:"U091"
            },
            { Name : "Karuna",
              RollNo:"U092"
            },
            { Name : "Pankaj",
              RollNo:"U093"
            },
            { Name : "Sandeep",
              RollNo:"U094"
            },
            { Name : "Sanghu",
              RollNo:"U095"
            }
            ]
        }
      ]},
      {
      "IX":[
        {
          "A":[
            { Name : "Pooja",
              RollNo:"U096"
            },
            { Name : "Padma",
              RollNo:"U097"
            },
            { Name : "Pavitha",
              RollNo:"U098"
            },
            { Name : "Ramki",
              RollNo:"U099"
            },
            { Name : "Prakriti",
              RollNo:"U100"
            }]
        },
        {
          "B":[
            { Name : "Abhay",
              RollNo:"U101"
            },
            { Name : "Abhishek",
              RollNo:"U102"
            },
            { Name : "Rashu",
              RollNo:"U103"
            },
            { Name : "Virendra",
              RollNo:"U104"
            },
            { Name : "Mohan",
              RollNo:"U105"
            }]
        },
        {
          "C":[
            { Name : "Krishna",
              RollNo:"U106"
            },
            { Name : "Radha",
              RollNo:"U107"
            },
            { Name : "Anu",
              RollNo:"U108"
            },
            { Name : "Raghu",
              RollNo:"U109"
            },
            { Name : "Dilip",
              RollNo:"U110"
            }]
        }

      ]},
      {
      "IIX":[

        {
        "A":[
          { Name : "Ram",
            RollNo:"U081"
          },
          { Name : "Sita",
            RollNo:"U082"
          },
          { Name : "Laxman",
            RollNo:"U083"
          },
          { Name : "Ganesh",
            RollNo:"U084"
          },
          { Name : "Mahesh",
            RollNo:"U085"
          }]
        },
        {
          "B":[
            { Name : "Ravi",
              RollNo:"U086"
            },
            { Name : "Ankita",
              RollNo:"U087"
            },
            { Name : "Aditi",
              RollNo:"U088"
            },
            { Name : "Ruchika",
              RollNo:"U089"
            },
            { Name : "Aishwariya",
              RollNo:"U090"
            }]
        },
        {
        "C":[
          { Name : "Neha",
            RollNo:"U091"
          },
          { Name : "Meenu",
            RollNo:"U092"
          },
          { Name : "Sonu",
            RollNo:"U093"
          },
          { Name : "Kanhaiya",
            RollNo:"U094"
          },
          { Name : "Madhu",
            RollNo:"U095"
          }]

        }
        ]}];
		  /*
		   * if given group is the selected group, deselect it
		   * else, select the given group
		   */
       
				if($scope.listOfStudents)
				{
					var classVal = $stateParams.classVal;
          var sectionVal = "A";
          var listOfStudents = $scope.listOfStudents;
					var len = listOfStudents.length;
					for(var i=0;i<len;i++){
            var batchVal = listOfStudents[i][classVal];
            if(batchVal){
              var batchLength = batchVal.length;
              for(var k=0;k<batchLength;k++){
                var value1 = batchVal[k][sectionVal];
                if(value1){
                  $scope.studentsOfBatch = value1;
                }
              }
            }
          }
				}
        console.log($scope.studentsOfBatch)
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

    $scope.onFocus = function(index) {

      console.log("index  " + index);
    //var itemElement = angular.element(document.querySelectorAll(".homeworkList"));
      $scope.activeIndex = index;
    //itemElement[index].addClass(".homeworkBG");
    };

    $scope.showDesc = function(index) {
    var isActive = false;
    if($scope.activeIndex == index){ 
      isActive = true;
    }
    return isActive;
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
})


// examResultsCntrl
.controller('examResultsCntrl', function($scope,$state) {
  
  $scope.items = [
    { id: 0, title: "First Language", percentage: 9.8,grade: "A+"},
    { id: 1, title: "Second Language", percentage: 9.5, grade: "A"},
    { id: 2, title: "Third Language", percentage: 9.6,grade: "A" }
  ];
  
  var doughnutData = [
				{
					value: 400,
					color:"#FFFFFF",
					highlight: "#FFFFFF",
					label: "White"
				}

			];
			
		$scope.$on('$ionicView.beforeEnter', function(){
				var ctx = document.getElementById("chart-area").getContext("2d");
				return window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive : true});
			});

  
})

.controller('feedbackCntrl', function($scope,$state) {
  
  $scope.items = [
    { picture: "img/fee.jpg", name: "First Language", price: 9.8,currency: "A"},
    { picture: "img/fee.jpg", name: "Second Language", price: 9.5, currency: "A"},
    { picture: "img/fee.jpg", name: "Third Language", price: 9.6,currency: "A" }
  ];
  
})
  
.controller('feedbackDetailsCntrl', function($scope,$state) {
  
 $scope.details = [
  { picture: "img/fee.jpg", name: "Alexander", rollNo: 01,class: "X"}
  ];
  
  $scope.items = [
  { name1: "category1", min1: 0, max1: 10,value1: 1},
  { name1: "category2", min1: 0, max1: 10,value1: 2},
  { name1: "category3", min1: 0, max1: 10,value1: 3},
  { name1: "category4", min1: 0, max1: 10,value1: 4}
  ];
  
});

