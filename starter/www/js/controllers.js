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

.controller('attendanceCtrl', function($scope,dateFilter) {
   $scope.date = dateFilter(new Date(), 'yyyy-MM-dd');//'2013-11-26';
   $scope.minDate = '2010-1-1';
   $scope.maxDate = '2050-12-30';
   $scope.disabledDates = ['2015-06-25', '2013-11-30'];
   $scope.absentDates = ['2015-05-05','2015-05-12','2015-06-10'];
   $scope.presentDates =['2015-07-03','2015-06-14'];
   $scope.holidayDates = ['2015-06-25','2015-06-18'];
   $scope.eventDates = ['2015-07-15','2015-06-22'];  
  $scope.playlists = [
    { title: 'Absent Date',date: '2015-05-05', id: 1 },
    { title: 'Absent Date',date: '2015-05-12', id: 2 },
    { title: 'Absent Date',date: '2015-06-10', id: 3 },
    { title: 'Present Date',date: '2015-07-03', id: 4 },
    { title: 'Present Date',date: '2015-06-14', id: 5},
	{ title: 'Holiday Date',date: '2015-06-25', id: 6},
	{ title: 'Holiday Date',date: '2015-06-18', id: 7},
	{ title:'Event Date',date: '2015-07-15', id: 8},
	{ title: 'Event Date',date: '2015-06-22', id: 9}
  ];
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});
