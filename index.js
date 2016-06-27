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
	var $monthdiv = document.createElement('div');
	$calendar.appendChild($monthdiv);

  	
	//Controllers
	
	this.printControllers = function()
	{
		var controllers = document.createElement('div');
		controllers.innerHTML = '<p id="prev">prev</p> <p id="next">next</p>';
		$calendar.appendChild(controllers);
		
	}
	
	this.printMonth = function(month){
		if (!month) month = options.startDate.getMonth();
				
		var $getDay = new Date($dateYear, month, 1).getDay();
		//console.log (' $getDay - '+ $getDay);
		var $div = document.createElement('div');
        $div.className='row';
        var $monthNum = document.createElement('div');
        $monthNum.className='col-md-7';
		new Date($dateYear, month, 1).format('MMM');
        //$monthNum.innerHTML = ArrDayInMonth[month];// month number and not numbers of days in month
		 $monthNum.innerHTML = options.title ;
        $div.appendChild($monthNum);
		 
		for ($i = $getDay-1; $i >= 0; $i--){
			var m = month-1;
			var j = ArrDayInMonth[m]-$i;
            var $out = printDay(j);
            $div.appendChild($out);
        } 
        for ($i = 1; $i<= ArrDayInMonth[month]; $i++){
            var $out = printDay($i, $dateDay);
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
		

    };//here i can print the month
	
	
	this.getJsonSh = function(schedule){
		options.events = JSON.parse(schedule, function(key, value) {
		  if (key == 'date') return new Date(value);
		  return value;
		});
		console.log( options.events );
		
	}
	

	//End controllers
	
	
	
	//Functions


    function dayInMonth(month){
        return 33 -  new Date($dateYear, month, 33).getDate();
    }; //here i can get a numbers of day in the year
   

    function printDay($dateDay, $dateToday){
        var div = document.createElement('div');
        ($dateDay == $dateToday) ? div.className = 'col-md-1 today' : div.className = 'col-md-1';
        div.innerHTML= $dateDay;
        return div;
    } //func that print the days. $dateDay - this date input. $dateToday - if its in shedule.

	
	
	//Init
	this.printControllers();
	this.printMonth($dateMonth);
	
	this.getJsonSh(options.events);
	
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

}



