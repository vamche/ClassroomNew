angular.module('starter.controllers', ['pickadate'])

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
   $scope.date = dateFilter(new Date(), 'yyyy-MM-dd');//'2013-11-26';
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
  
   $scope.edit = function(absentlist) {
    if(absentlist.id == "2"){
		$state.go('app.absentListAttendance');
	}
  };
  $scope.goBack = function(){
	$state.go('app.attendance');
  }
  
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('HomeworkCtrl', function($scope,$state) {
			$scope.groups = [];

			$scope.groups = [{  name: "Select Class", items: ["X","IX","IIX"], selectedItem : "" },
							 {  name: "Select Subject", items: ["Maths","Science","English"], selectedItem : "" }];
		  
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
		   $scope.resetHomework = function(){
			for(var i=0;i<$scope.groups.length;i++){
			  $scope.groups[i].selectedItem = "";
			}
			$scope.homeworkVal = "";
			$scope.shownGroup = null;
		  };
		  
		$scope.addItems=function(){
		  if($scope.groups[0].selectedItem != "" && $scope.groups[1].selectedItem != "" && $scope.homeworkVal != ""){
				$scope.items.push({
					id: Math.floor((Math.random() * 100) + 1),
					title: $scope.homeworkVal,
					subject: $scope.groups[1].selectedItem,
					batch: $scope.groups[0].selectedItem
				});			  
			  $state.go('app.HomeworkScreen');
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
  
   $scope.addHomework = function() {
	  
      $state.go('app.addHomework'); 
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
  
});
