function jCalendar (options){
    var elem, ArrDayInMonth = [];



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

   // console.log (ArrDayInMointh);
    printMonth($dateMonth);



    function dayInMonth(month){
        return 33 -  new Date($dateYear, month, 33).getDate();
    }; //here i can get a numbers of day in the year
    function printMonth(month){
        var $div = document.createElement('div');
        $div.className='row';
        var $monthNum = document.createElement('div');
        $monthNum.className='col-md-7';
        $monthNum.innerHTML = ArrDayInMonth[month];// month number and not numbers of days in month
        $div.appendChild($monthNum);
        for ($i = 1; $i<= ArrDayInMonth[month]; $i++){
            var $out = printDay($i, $dateDay);
            $div.appendChild($out);
        }
        var $calendar = document.getElementById(options.target);
        $calendar.appendChild($div);

    };//here i can print the month

    function printDay($dateDay, $dateToday){
        var div = document.createElement('div');
        ($dateDay == $dateToday) ? div.className = 'col-md-1 today' : div.className = 'col-md-1';
        div.innerHTML= $dateDay;
        return div;
    } //func that print the days. $dateDay - this date input. $dateToday - if its in shedule.

}


var myfirstCalendar = new jCalendar({
    title: "Сладости"
});
