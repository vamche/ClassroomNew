// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngSanitize','btford.socket-io','starter.controllers','timetable.controllers','socket.controller','Chat.Controller','ngEnter-Directive'])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  teacher: 'teacher_role',
  parent: 'parent_role',
  student: 'student_role'
})

.value('USER_DETAILS',{
  userName : '',
  userRole : '',
  classesInfo : [{class: "X", sections : ["A","B","C","D","E"], subjects: ["English", "Maths", "Science"]},
                 {class: "IX", sections : ["B"], subjects: ["Social"]}
                ],
  wardsInfo : [{id : "1", rollNo : "1", name : "Jessie", class : "X", subjects : ["English", "Maths", "Science"], img:""},
              {id : "2", rollNo : "10", name : "John", class : "IX", subjects : ["English", "Social"], img:""}
             ]
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })
  
  .state('app', {
    url: "/app",
    abstract: true,
    cache : false,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })
 .state('groupChat', {
		url: "/groupChat/:userName&:groupName",
		templateUrl: "templates/groupChat.html"
	})
	

  .state('chat', {
    url: "/chat/:userName&:messageTo&:flag",
    cache: false,
    templateUrl: "templates/chat.html"
  })


  .state('listOfGroupContacts', {
    url: "/listOfGroupContacts/:userName",
    templateUrl: "templates/listOfGroupContacts.html"
  })

	.state('listOfGroupChat', {
		url: "/listOfGroupChat/:userName",
		templateUrl: "templates/listOfGroupChat.html"
	})

  .state('app.dashboard', {
    url: "/dashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html",
        controller: 'DashboardCtrl'
      }
    }
  })

    .state('app.attendance', {
      url: "/attendance",
      views: {
        'menuContent': {
          templateUrl: "templates/attendance.html",
          controller: 'attendanceCtrl'
        }
      }
    })
	
	.state('app.absentDaysDetail', {
      url: "/absentDaysDetail",
      views: {
        'menuContent': {
          templateUrl: "templates/absentDaysDetail.html",
          controller: 'attendanceCtrl'
        }
      }
    })
	.state('app.fee', {
    url: "/fee",
    views: {
      'menuContent': {
        templateUrl: "templates/fee.html",
		controller: 'feeCntrl'
      }
    }
  })
	
  .state('app.addHomework', {
    url: "/addHomework",
    views: {
      'menuContent': {
        templateUrl: "templates/addHomework.html",
		    controller: 'AddHomeworkCtrl'
      }
    }
  })
  
    .state('app.HomeworkScreen', {
    url: "/Homework",
    views: {
      'menuContent': {
        templateUrl: "templates/Homework.html",
		    controller: 'HomeworkCtrl'
      }
    }
  })
  
  .state('app.todayTimetable', {
    url: "/todayTimetable",
    views: {
      'menuContent': {
        templateUrl: "templates/todayTimetable.html",
		controller: 'TimetableCtrl'
      }
    }
  })

    .state('app.weekTimetable', {
    url: "/weekTimetable",
    views: {
      'menuContent': {
        templateUrl: "templates/weekTimetable.html",
		controller: 'TimetableCtrl'
      }
    }
  })
  
 .state('app.takeAttendance', {
    url: "/takeAttendance",
    views: {
      'menuContent': {
        templateUrl: "templates/takeAttendance.html",
		controller: 'takeAttendance'
      }
    }
  })
  
   .state('app.addAttendanceComment', {
    url: "/addAttendanceComment",
    views: {
      'menuContent': {
        templateUrl: "templates/addAttendanceComment.html",
		controller: 'takeAttendance'
      }
    }
  })
  .state('app.addResult', {
    url: "/addResult",
    views: {
      'menuContent': {
        templateUrl: "templates/addResult.html",
		controller: 'ResultCtrl'
      }
    }
  })
  
  .state('app.circular', {
    url: "/circular",
    views: {
      'menuContent': {
        templateUrl: "templates/circular.html",
		controller: 'circular'
      }
    }
  })
  
  .state('app.circularDetails', {
      url: "/circularDetails",
      views: {
        'menuContent': {
          templateUrl: "templates/circularDetails.html",
          controller: 'circular'
        }
      }
    })
	
	.state('app.circularDetailsForTeacher', {
      url: "/circularDetailsForTeacher",
      views: {
        'menuContent': {
          templateUrl: "templates/circularDetailsForTeacher.html",
          controller: 'circular'
        }
      }
    })
	
  .state('app.circularDetailsForStudent', {
      url: "/circularDetailsForStudent",
      views: {
        'menuContent': {
          templateUrl: "templates/circularDetailsForStudent.html",
          controller: 'circular'
        }
      }
    })

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
