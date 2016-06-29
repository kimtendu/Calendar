function jCalendar (options){
	
	//Default options
    var elem =this, ArrDayInMonth = [];
    if (!options.startDate) options.startDate = new Date;
    if (!options.target) options.target = 'jCalendar';

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
		
			
		}//Month view
		else{
			console.log('here will be weeks view');
		}//week view
		
		 
        $monthdiv.innerHTML='';
        $monthdiv.appendChild($div);
		
		parseJsonToGrid(options.contents);
		
		
	}//print main Grid of calendar
	

	
	//End Class
	
	
	
	//Functions
	function createElementAndPush($id, $text, $parent){
		var $div = document.createElement('div');
			$div.id = $id;
			$div.innerHTML = $text
			$parent.appendChild($div);		
	}
		

    function dayInMonth(month){
        return 33 -  new Date($dateYear, month, 33).getDate();
    }; //here i can get a numbers of day in the year
   

    function printDay($dateDay, $dateToday, $month){
		var div = document.createElement('div');
        ($dateDay == $dateToday) ? div.className = 'col-md-1 today' : div.className = 'col-md-1';
		div.setAttribute('data-day', $dateDay);
		div.setAttribute('data-month', $month);
        div.innerHTML= $dateDay;
        return div;
    } //func that print the days. $dateDay - this date input. $dateToday - if its in shedule.
	
	function parseJsonToGrid($contents){
		var $gridsElements = document.querySelectorAll('#grid .col-md-1');
		
		for ( var i = 0; i < $gridsElements.length; i++){
			var $element = $gridsElements[i];			
			for ( var $obj in $contents) {
				
				var $startdate = new Date($contents[$obj].startdate).getDate(),
					$monthdate = new Date($contents[$obj].startdate).getMonth(),
					$elementStartdate = $element.getAttribute('data-day'),
					$elementMonth = $element.getAttribute('data-month');
				if ($elementStartdate == $startdate && $monthdate == $elementMonth){
					var $oldInner =  $element.innerHTML
					$element.innerHTML= $oldInner + "here Json out";
					//console.log('here JSON');
				}
				
			
			}
			
		}
		
	}; // set all ivents to grid in Montth view
	

	//end functions
	
	//Init
	//this.printControllers();
	this.printHeader();
	this.printGrid($dateMonth);
	
	//his.getJsonSh(options.contents);
	//parseContents(options.contents);
	//console.log(options.contents);
	
	
	//Controllers
	var elemPrv = document.getElementById('prev');
	elemPrv.onclick = function(Event){
		$dateMonth--;
		elem.printMonth($dateMonth);
		
	};
	
	var elemNext = document.getElementById('next');
	elemNext.onclick = function(Event){
		$dateMonth++;
		elem.printMonth($dateMonth);
		
	}
	
	//End controllers
	

}