//! jcalendar.js
//! version : 0.0.2
//! author : Levy Kim (kimtendu) 
//! license : MIT


//Things to add:
//1) weeks view
//2) Errors
//3) data picker

function jCalendar (options){
	
	//Default options
    var elem =this, ArrDayInMonth = [];
    if (!options.startDate) options.startDate = new Date;
    if (!options.target) options.target = 'jCalendar';	
	if (!options.view.weekTimelineClass) options.view.weekTimelineClass = 'timeline';
	if (!options.view.calendarView) options.view.calendarView = 'month';
	
	

    //here im starting to build a calendar
    var $dateYear = options.startDate.getFullYear();	
    var $dateMonth = options.startDate.getMonth();
    var $dateDay = options.startDate.getDate();
	
    for (i=0; i<12; i++){
        var j = dayInMonth(i);
        ArrDayInMonth[i] = j;
    }; // ArrDayInMonth - in that arr i know max numbers of day in all month of that year
	
	var $calendar = document.getElementById(options.target);
	var divHeader = document.createElement('div');
	$calendar.appendChild(divHeader);
	var $monthdiv = document.createElement('div');
	$monthdiv.classList.add(options.tpl.grid.TplClass);
	$calendar.appendChild($monthdiv);

  	//End Start Data	
	
	//Class
	
	this.printHeader = function(){		
		divHeader.classList.add(options.tpl.header.class);
		if (options.tpl.header.nextButton){
			 createElementAndPush('next', 'next', divHeader )
		}
		if (options.tpl.header.prevButton){
			createElementAndPush('prev', 'prev', divHeader )
		}		
		if (options.title){
			createElementAndPush('title', options.title, divHeader)
		}
		createElementAndPush('monthview', 'month', divHeader);
		createElementAndPush('weekview', 'week', divHeader);
		
				
	}//print header of Calendar
	
	this.printGrid = function(month, view){
		if (!month) month = options.startDate.getMonth();
		if (!view) view = options.view.calendarView;
		
		var $div = document.createElement('div');
        $div.className='row';
		$div.id="grid";
		
		var $getDay = new Date($dateYear, month, 1).getDay();
		if (view=="month"){		
		for ($i = $getDay-1; $i >= 0; $i--){
			var m = month-1;
			var j = ArrDayInMonth[m]-$i;
            var $out = printDay(j);
            $div.appendChild($out);
        } 
        for ($i = 1; $i<= ArrDayInMonth[month]; $i++){
            var $out = printDay($i, $dateDay, month);
            $div.appendChild($out);
        }		 		 
		var $getThisMonthDay = new Date($dateYear, month, ArrDayInMonth[month]).getDay(); 
		var $afday = 1;
		for ($i = $getThisMonthDay; $i< 6; $i++){
            var $out = printDay($afday);
            $div.appendChild($out);
			$afday++;
        }
		$monthdiv.innerHTML='';
        $monthdiv.appendChild($div);
		
		parseJsonToGrid(options.contents);
			
		}//Month view
		else{
			var $timeline = document.createElement('div'),
				$dayofWeek = options.startDate.getDay(); //why i can take start day? what if i need calendar for week ago
			$timeline.classList.add(options.view.weekTimelineClass);
			
			var $weekHeder = document.createElement('div');
			$weekHeder.classList.add('timeHeader');
			$weekHeder.innerHTML='time|day';
			$timeline.appendChild($weekHeder);
			for ( var $i=0; $i<=24; $i++){
				var $timecell = document.createElement('div');
				$timecell.classList.add('timecell');
				$timecell.innerHTML=$i+':00:00';
				$timecell.setAttribute('data-time', $i);
				$timeline.appendChild($timecell);
				
			}
			
			$div.appendChild($timeline);
			
			for ( var $i=$dateDay-$dayofWeek; $i<=$dateDay-$dayofWeek+7; $i++){
				var $timeline = document.createElement('div'),
					$weekHeder = document.createElement('div'),
					$contents = options.contents,
					$dateThisDay = new Date($dateYear, month, $i).getDate(),
					$offset = 0;
				$weekHeder.classList.add('timeHeader');
				$weekHeder.innerHTML=$dateThisDay + ':'+month;
				$timeline.appendChild($weekHeder);
				//$timeline.innerHTML='today is '+ $dateThisDay;
				$timeline.classList.add(options.view.weekTimelineClass);
				for ( var $obj in $contents) {
					var $startdate = new Date($contents[$obj].startdate).getDate(),//get the day
						$monthdate = new Date($contents[$obj].startdate).getMonth(),//get the month
						$hoursdate = new Date($contents[$obj].startdate).getHours();//get the hours
					if ( $monthdate==$dateMonth && $startdate==$dateThisDay ){
						var $tmp = document.createElement('div');
						$tmp.classList.add('timecell');
						$tmp.innerHTML = '<form method="post" class="ms2_form"><button class="btn btn-default pull-right" type="submit" name="ms2_action" value="cart/add"><i class="glyphicon glyphicon-barcode"></i>'+$contents[$obj].title +'</button> <input type="hidden" name="id" value="'+$contents[$obj].id+'">            <input type="hidden" name="count" value="1"><input type="hidden" name="options" value="[]"></form>';
						
						var $valOffset = ($hoursdate -$offset)*44+'px';
						$tmp.style.marginTop = $valOffset;
						$tmp.setAttribute('data-time', $hoursdate);
						$timeline.appendChild($tmp);
						$offset = $hoursdate+1;
					}
					
				
				}
				
				$div.appendChild($timeline);
			}
			
			$monthdiv.innerHTML='';
        	$monthdiv.appendChild($div);
		}//week view
		
		 
        
		
		
	}//print main Grid of calendar
		
	//End Class	
	
	//Functions
	function createElementAndPush($id, $text, $parent){
		var $div = document.createElement('div');
			$div.id = $id;
			$div.innerHTML = $text;
			$parent.appendChild($div);		
	}		

    function dayInMonth(month){
        return 33 -  new Date($dateYear, month, 33).getDate();
    }; //here i can get a numbers of day in the year
   
    function printDay($dateDay, $dateToday, $month){
		var div = document.createElement('div');
        //($dateDay == $dateToday) ? div.className = 'col-md-1 today' : div.className = 'col-md-1';
		($dateDay == $dateToday) ? div.className = options.tpl.grid.CellTplClass + ' today' : div.className = options.tpl.grid.CellTplClass;
		//($dateDay == $dateToday) ? div.classList.add(options.tpl.grid.CellTplClass) : div.classList.add(options.tpl.grid.CellTplClass);
		div.setAttribute('data-day', $dateDay);
		div.setAttribute('data-month', $month);
        div.innerHTML= $dateDay;
        return div;
    } //func that print the days. $dateDay - this date input. $dateToday - if its in shedule.
	
	function printDayWeek($dateDay, $dateToday, $month){
		var div = document.createElement('div');
        //($dateDay == $dateToday) ? div.className = 'col-md-1 today' : div.className = 'col-md-1';
		($dateDay == $dateToday) ? div.className = options.tpl.grid.CellTplClass + ' today' : div.className = options.tpl.grid.CellTplClass;
		//($dateDay == $dateToday) ? div.classList.add(options.tpl.grid.CellTplClass) : div.classList.add(options.tpl.grid.CellTplClass);
		div.setAttribute('data-day', $dateDay);
		div.setAttribute('data-month', $month);
        div.innerHTML= $dateDay;
        return div;
    } //func that print the days. $dateDay - this date input. $dateToday - if its in shedule.
	
	function parseJsonToGrid($contents){

		var	$gridsElements = document.querySelectorAll('#grid .'+ options.tpl.grid.CellTplClass);
		
		for ( var i = 0; i < $gridsElements.length; i++){
			var $element = $gridsElements[i];			
			for ( var $obj in $contents) {
				
				var $startdate = new Date($contents[$obj].startdate).getDate(),
					$monthdate = new Date($contents[$obj].startdate).getMonth(),
					$elementStartdate = $element.getAttribute('data-day'),
					$elementMonth = $element.getAttribute('data-month');
				if ($elementStartdate == $startdate && $monthdate == $elementMonth){
					var $inner = document.createElement('div');
					$inner.innerHTML = '<form method="post" class="ms2_form"><button class="btn btn-default pull-right" type="submit" name="ms2_action" value="cart/add"><i class="glyphicon glyphicon-barcode"></i>'+$contents[$obj].title +'</button> <input type="hidden" name="id" value="'+$contents[$obj].id+'">            <input type="hidden" name="count" value="1"><input type="hidden" name="options" value="[]"></form>';
					$element.appendChild($inner);
					//var $oldInner =  $element.innerHTML
					//$element.innerHTML= $oldInner + "here Json out";
					//console.log('here JSON');
				}
				
			
			}
			
		}
		
	}; // set all ivents to grid in Montth view
	
	//end functions
	
	//Init

	this.printHeader();
	this.printGrid($dateMonth);
		
	//Controllers
	var elemPrv = document.getElementById('prev');
	elemPrv.onclick = function(Event){
		$dateMonth--;
		elem.printGrid($dateMonth);
		
	};
	
	var elemNext = document.getElementById('next');
	elemNext.onclick = function(Event){
		$dateMonth++;
		elem.printGrid($dateMonth);
		
	}
	
	var elemMonth = document.getElementById('monthview');
	elemMonth.onclick = function(Evene){
		options.view.calendarView = 'month';
		elem.printGrid($dateMonth);
	}
	var elemWeek = document.getElementById('weekview');
	elemWeek.onclick = function(Evene){
		options.view.calendarView = 'week';
		elem.printGrid($dateMonth);
	}
	
	//End controllers
	
}