/*function events()
{
var Draggable = FullCalendar.Draggable;

var containerEl = document.getElementById('div1');

 new Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function(eventEl) {
      return {
        title: eventEl.innerText
      };
    }
  });
}
*/
/*document.addEventListener('DOMContentLoaded', function())
{
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerE1 = document.getElementById('external-events');
    var calendarE1 = document.getElementById('calendar');
    var checkbox = document.getElementById('drop-remove');

    new Draggable(containerE1,
    {
        itemSelector: '.fc-event',
        eventData: function(eventE1)
        {return {title: eventE1.innerText};}
    });

  var calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function(info) {
      // is the "remove after drop" checkbox checked?
      if (checkbox.checked) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    }
  });

  calendar.render();
});*/
/*
document.addEventListener('DOMContentLoaded', function())
{
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerE1 = document.getElementById("div1");
    var calendarE1 = document.getElementById("calendar");

    new Draggable(containerE1,
    {
        itemSelector: 'event_main2',
        eventData: function(eventE1)
        {
            return {title: eventE1.innerText};
        }
    });

}*/