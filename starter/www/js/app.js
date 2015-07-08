// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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

     .state('app.login', {
      url: "/login",
      
	  views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: "LoginCtrl"
      }
    }
    })
  
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.dashboard', {
    url: "/dashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html"
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
	
	
  .state('app.addHomework', {
    url: "/addHomework",
    views: {
      'menuContent': {
        templateUrl: "templates/addHomework.html",
		controller: 'HomeworkCtrl'
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
	
  
  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
