angular.module('timetable.controllers', [])

.factory('timetableFactory',function($state){


	var timeTableForTodayList = [
							{time:'8:00-8:45' , subject :'Math',subjectCode : 'M001' , ClassRoom : 'Room01'},
							{time:'8:45-9:30' , subject :'Science',subjectCode : 'S001' , ClassRoom : 'Room02'},
							{time:'9:30-10:15' , subject :'English',subjectCode : 'E001' , ClassRoom : 'Room01'},
							{time:'10:15-10:45' , subject :'Social Study',subjectCode : 'S002' , ClassRoom : 'Room03'},
							{time:'10:45-1:30' , subject :'Computer',subjectCode : 'C001' , ClassRoom : 'Room01'},
							{time:'1:30-2:30' , subject :'Lunch Break',subjectCode : '' , ClassRoom : ''},
							{time:'2:30-3:00' , subject :'Physical Education',subjectCode : 'P001' , ClassRoom : 'Room02'}
							
			];
	
	var subjectCode = ['M001' ,'S001','E001','S002','C001','P001'];
	
					
	

    return{
        getTodayTimetableData:function(){
		    var timeTableForTodayListlength = timeTableForTodayList.length;
			var subjectColorCodeArray = "";
			if(subjectCode){
				subjectColorCodeArray = this.getSubjectColorClass();
			}
		    for(var i=0 ; i< timeTableForTodayListlength;i++){
			  var subjectCode1 = timeTableForTodayList[i]['subjectCode'];
			  if(subjectCode1 && subjectColorCodeArray){
				timeTableForTodayList[i]['subjectColor'] = subjectColorCodeArray[subjectCode1];
			  }else{
				timeTableForTodayList[i]['subjectColor'] = 'subjectColorDefault';
			  }
			}
            return timeTableForTodayList;
        },
        getSubjectColorClass:function(){
		    var subjectColorCodeArray = [];
			if(subjectCode){
				for(var j = 0; j < subjectCode.length ; j++){
					subjectColorCodeArray[subjectCode[j]] = 'subjectColor' + j;
				}
			}
            return subjectColorCodeArray;
        }
    }


})




	  .controller('TimetableCtrl', function($scope,timetableFactory) {
         
			$scope.timeTableForTodayList = timetableFactory.getTodayTimetableData();
		
      });
	  
	 