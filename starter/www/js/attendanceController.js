      angular.module('starter', ['pickadate']);

	  .controller('attendanceController', function($scope,dateFilter) {
        $scope.date = dateFilter(new Date(), 'yyyy-MM-dd');//'2013-11-26';
        $scope.minDate = '2010-1-1';
        $scope.maxDate = '2050-12-30';
        $scope.disabledDates = ['2015-06-25', '2013-11-30'];
		$scope.absentDates = ['2015-05-05','2015-05-12','2015-06-10'];
		$scope.presentDates =['2015-07-03','2015-06-14'];
	    $scope.holidayDates = ['2015-06-25','2015-06-18'];
		$scope.eventDates = ['2015-07-15','2015-06-22'];
		$scope.playlists = [
						{ title: 'Reggae', id: 1 },
						{ title: 'Chill', id: 2 },
						{ title: 'Dubstep', id: 3 },
						{ title: 'Indie', id: 4 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Rap', id: 5 },
						{ title: 'Cowbell', id: 6 }
		];
			 
			
      })