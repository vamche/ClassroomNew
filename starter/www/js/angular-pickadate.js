
;(function(angular){
  var indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };

  angular.module('pickadate', [])

    .provider('pickadateI18n', function() {
      var defaults = {
        'prevM': '<',
        'nextM': '>',
        'prevY': '<<',
        'nextY': '>>'
      };

      this.translations = {};

      this.$get = function() {
        var translations = this.translations;

        return {
          t: function(key) {
            return translations[key] || defaults[key];
          }
        };
      };
    })

    .factory('pickadateUtils', ['dateFilter', function(dateFilter) {
      return {
        isDate: function(obj) {
          return Object.prototype.toString.call(obj) === '[object Date]';
        },

        stringToDate: function(dateString) {
          if (this.isDate(dateString)) return new Date(dateString);
          var dateParts = dateString.split('-'),
            year  = dateParts[0],
            month = dateParts[1],
            day   = dateParts[2];

          // set hour to 3am to easily avoid DST change
          return new Date(year, month - 1, day, 3);
        },

        dateRange: function(first, last, initial, format) {
          var date, i, _i, dates = [];

          if (!format) format = 'yyyy-MM-dd';

          for (i = _i = first; first <= last ? _i < last : _i > last; i = first <= last ? ++_i : --_i) {
            date = this.stringToDate(initial);
            date.setDate(date.getDate() + i,0);
            dates.push(dateFilter(date, format));
          }
          return dates;
        }
      };
    }])

    .directive('pickadate', ['$locale','$timeout', 'pickadateUtils', 'pickadateI18n', 'dateFilter', function($locale,$timeout, dateUtils, i18n, dateFilter) {
      return {
        require: 'ngModel',
        scope: {
          date: '=ngModel',
          defaultDate: '=',
          minDate: '=',
          maxDate: '=',
          disabledDates: '=',
		  attendanceInfo: '=',
        },
        template:
          '<div class="pickadate">' +
            '<div class="pickadate-header">' +
              '<div class="pickadate-controls">' +
                /*'<a href="" class="pickadate-prevY" ng-click="changeMonth(-12)" ng-show="allowPrevMonth">{{t("prevY")}}</a>' +*/
                '<button class="button-icon icon ion-android-arrow-dropleft pickadate-prevM" ng-click="changeMonth(-1)"  ng-show="allowPrevMonth"></button>' +
                '<button class="button-icon icon ion-android-arrow-dropright pickadate-nextM" ng-click="changeMonth(1)"   ng-show="allowNextMonth"></button>' +                
                /*'<a href="" class="pickadate-nextY" ng-click="changeMonth(12)"  ng-show="allowNextMonth">{{t("nextY")}}</a>' +*/
              '</div>' +
              '<h3 class="pickadate-centered-heading padding no-margin">' +
                '<strong>{{currentDate | date:"MMMM - yyyy"}}</strong>' +
              '</h3>' +
            '</div>' +
            '<div class="pickadate-body">' +
              '<div class="pickadate-main">' +
                '<ul class="pickadate-cell">' +
                  '<li class="pickadate-head" ng-repeat="dayName in dayNames">' +
                    '{{dayName}}' +
                  '</li>' +
                '</ul>' +
                '<ul class="pickadate-cell">' +
                  '<li ng-repeat="d in dates.slice(0,7)" ng-click="setDate(d,1)" class="{{d.className}}" ng-class="{\'pickadate-active\': date == d.date}">' +
                    '{{d.date | date:"d"}}' +
					'</li>' +
					'<div id="Row1" class="checkCard ng-hide card padding selected-date">'+
						'<h4 class="calm">Date selected : {{date.date}} </br> </h4>'+
						'{{ date.type }} </br>'+
						'Comments : {{ date.data }}'+
					'</div>'+
                  '<li ng-repeat="d in dates.slice(7,14)" ng-click="setDate(d,2)" class="{{d.className}}" ng-class="{\'pickadate-active\': date == d.date}">' +
                    '{{d.date | date:"d"}}' +
					'</li>' +
					'<div id="Row2" class="checkCard ng-hide card padding selected-date">'+
						'<h4 class="calm">Date selected : {{date.date}} </br> </h4>'+
						'{{ date.type }} </br>'+
						'Comments : {{ date.data }}'+
					'</div>'+
                  '<li ng-repeat="d in dates.slice(14,21)" ng-click="setDate(d,3)" class="{{d.className}}" ng-class="{\'pickadate-active\': date == d.date}">' +
                    '{{d.date | date:"d"}}' +
					'</li>' +
					'<div id="Row3" class="checkCard ng-hide card padding selected-date">'+
						'<h4 class="calm">Date selected : {{date.date}} </br> </h4>'+
						'{{ date.type }} </br>'+
						'Comments : {{ date.data }}'+
					'</div>'+
                  '<li ng-repeat="d in dates.slice(21,28)" ng-click="setDate(d,4)" class="{{d.className}}" ng-class="{\'pickadate-active\': date == d.date}">' +
                    '{{d.date | date:"d"}}' +
					'</li>' +
					'<div id="Row4" class="checkCard ng-hide card padding selected-date">'+
						'<h4 class="calm">Date selected : {{date.date}} </br> </h4>'+
						'{{ date.type }} </br>'+
						'Comments : {{ date.data }}'+
					'</div>'+	
                  '<li ng-repeat="d in dates.slice(28,35)" ng-click="setDate(d,5)" class="{{d.className}}" ng-class="{\'pickadate-active\': date == d.date}">' +
                    '{{d.date | date:"d"}}' +
					'</li>' +
					'<div id="Row5" class="checkCard ng-hide card padding selected-date">'+
						'<h4 class="calm">Date selected : {{date.date}} </br> </h4>'+
						'{{ date.type }} </br>'+
						'Comments : {{ date.data }}'+
					'</div>'+
				'<li ng-repeat="d in dates.slice(35,42)" ng-click="setDate(d,6)" class="{{d.className}}" ng-class="{\'pickadate-active\': date == d.date}">' +
                    '{{d.date | date:"d"}}' +
					'</li>' +
					'<div id="Row6" class="checkCard ng-hide card padding selected-date">'+
						'<h4 class="calm">Date selected : {{date.date}} </br> </h4>'+
						'{{ date.type }} </br>'+
						'Comments : {{ date.data }}'+
					'</div>'+					
                '</ul>' +
              '</div>' +
            '</div>' +
          '</div>',

        link: function(scope, element, attrs, ngModel)  {
          var minDate       = scope.minDate && dateUtils.stringToDate(scope.minDate),
              maxDate       = scope.maxDate && dateUtils.stringToDate(scope.maxDate),
              disabledDates = scope.disabledDates || [],
			  attendanceInfo = scope.attendanceInfo || [],
              currentDate   = (scope.defaultDate && dateUtils.stringToDate(scope.defaultDate)) || new Date();

          scope.dayNames    = $locale.DATETIME_FORMATS['SHORTDAY'];
          scope.currentDate = currentDate;
          scope.t           = i18n.t;

          scope.render = function(initialDate) {
            initialDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), 1, 3);

            var currentMonth    = initialDate.getMonth() + 1,
              dayCount          = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0, 3).getDate(),
              prevDates         = dateUtils.dateRange(-initialDate.getDay(), 0, initialDate),
              currentMonthDates = dateUtils.dateRange(0, dayCount, initialDate),
              lastDate          = dateUtils.stringToDate(currentMonthDates[currentMonthDates.length - 1]),
              nextMonthDates    = dateUtils.dateRange(1, 7 - lastDate.getDay(), lastDate),
              allDates          = prevDates.concat(currentMonthDates, nextMonthDates),
              dates             = [],
              today             = dateFilter(new Date(), 'yyyy-MM-dd');

            // Add an extra row if needed to make the calendar to have 6 rows
            if (allDates.length / 7 < 6) {
              allDates = allDates.concat(dateUtils.dateRange(1, 8, allDates[allDates.length - 1]));
            }

            var nextMonthInitialDate = new Date(initialDate);
			
            nextMonthInitialDate.setMonth(currentMonth);

            scope.allowPrevMonth = !minDate || initialDate > minDate;
            scope.allowNextMonth = !maxDate || nextMonthInitialDate < maxDate;
			for (var i = 0; i < allDates.length; i++) {
              var className = "", date = allDates[i]; 
			  var dataVal = "";
			  var dateVal = "";
			  var isSpecialDate = false;
			  if(attendanceInfo){
				var len = attendanceInfo.length;
				var typeVal = "";
				for(var k=0;k<len;k++){			
					dateVal = attendanceInfo[k].date;
					if (dateVal == date) {
						isSpecialDate = true;
					    typeVal = attendanceInfo[k].type;
						dataVal = attendanceInfo[k].data;
					    if(typeVal == 'absent'){
						    typeVal = 'Absent';
							className = 'pickadate-absent';
						}else if(typeVal == 'holiday'){
						    typeVal = 'Holiday';
							className = 'pickadate-holiday';
						}					
					}
				}
			  }
			  
              if (date < scope.minDate || date > scope.maxDate || dateFilter(date, 'M') !== currentMonth.toString()) {
                className = 'pickadate-disabled';
              } else if (indexOf.call(disabledDates, date) >= 0) {
                className = 'pickadate-disabled pickadate-unavailable';
              } else if(!isSpecialDate){
				typeVal = 'Present';
				className = 'pickadate-present';
			  }
              if (date === today) {
                className += ' pickadate-today';
              }
			   dates.push({date: date, className: className,data:dataVal,type:typeVal});
            }

            scope.dates = dates;
          };

          scope.setDate = function(dateObj,value) {
		  
		     console.log(value);
            if (isDateDisabled(dateObj)) return;
            ngModel.$setViewValue(dateObj);
			if(this.d.className != "pickadate-disabled"){
			    var dataDisplay = false;
				var k ="";
				for(var t = 1; t < 7 ; t++){
					var rowVal = '#Row'+t;
					var myE1 = "";
					myE1 = angular.element( document.querySelector( rowVal ) );
					myE1.addClass('ng-hide');
					if(value == t){	
						if(myE1.hasClass('ng-hide')){
						    dataDisplay = true;
							myE1.removeClass('ng-hide');
							k = t;
						}else{						
							myE1.addClass('ng-hide');
						}
					}else{
						myE1.addClass('ng-hide'); 
					}
				
				}
			}
			    if(dataDisplay){
				   var rowVal1 = '#Row'+k;
				   var myE3 = angular.element( document.querySelector( rowVal1 ) );
			       $timeout(function(){
						myE3.addClass('ng-hide');
					}, 2000);
				}
			
          };

          ngModel.$render = function () {
            if ((date = ngModel.$modelValue) && (indexOf.call(disabledDates, date) === -1)) {
              scope.currentDate = currentDate = dateUtils.stringToDate(date);
            } else if (date) {
              // if the initial date set by the user is in the disabled dates list, unset it
              scope.setDate({},0);
            }
            scope.render(currentDate);
          };

          scope.changeMonth = function (offset) {
            // If the current date is January 31th, setting the month to date.getMonth() + 1
            // sets the date to March the 3rd, since the date object adds 30 days to the current
            // date. Settings the date to the 2nd day of the month is a workaround to prevent this
            // behaviour
            currentDate.setDate(1,0);
            currentDate.setMonth(currentDate.getMonth() + offset);
            scope.render(currentDate);
          };

          function isDateDisabled(dateObj) {
            return (/pickadate-disabled/.test(dateObj.className));
          }
        }
      };
    }]);
})(window.angular);
