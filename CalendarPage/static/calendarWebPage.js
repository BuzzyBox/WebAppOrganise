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