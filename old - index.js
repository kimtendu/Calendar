var $dateToday = new Date;
var $dateYear = $dateToday.getFullYear();
var $dateMonth = $dateToday.getMonth(); 
var $dateDay = $dateToday.getDate();
//var $dateWeek = $dateToday.getDay();  

function dayInMonth($dateToday) //here i can get a numbers of day in the year
{
	return 33 -  new Date($dateToday.getFullYear(), $dateToday.getMonth(), 33).getDate();
}

function printMonth($dateYear, $dateMonth, $dateDay ){
	var $askdate = new Date($dateYear, $dateMonth,  $dateDay);
	var $askdate1 = new Date($dateYear, $dateMonth,  1);
	var $dateWeek = $askdate1.getDay();


	var $dayInThisMonth = dayInMonth($askdate)
	var $div = document.createElement('div');
	$div.className='row';
	var $monthNum = document.createElement('div');
	$monthNum.className='col-md-7';
	$monthNum.innerHTML = $dateMonth;
	$div.appendChild($monthNum);
	for ($i = 1; $i<=$dateWeek; $i++){
			var $out = printDayEmpty($i);
			$div.appendChild($out);
		}

	for ($i = 1; $i<= $dayInThisMonth; $i++){
		var $out = printDay($i, $dateDay);
		$div.appendChild($out);
	}
	var $calendar = document.getElementById('calendar');
	$calendar.appendChild($div);
}


function printDay($dateDay, $dateToday){
	var div = document.createElement('div');
	($dateDay == $dateToday) ? div.className = 'col-md-1 today' : div.className = 'col-md-1';
	div.innerHTML= $dateDay;
	return div;
}

function printDayEmpty($dateDay, $dateToday){
	var div = document.createElement('div');
	div.className = 'col-md-1 emptyday' ;
	div.innerHTML= 'i';
	return div;
}

printMonth($dateYear, $dateMonth, $dateDay);
//$askdate = new Date(2013, 1,  3);
//console.log(dayInMonth($askdate) );


