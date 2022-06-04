
        function addListeners()
        {
            document.getElementById("event-modal-close-btn").addEventListener("click", closeEditModalBox, false);
        }

        document.addEventListener('DOMContentLoaded', function() {
         var Calendar = FullCalendar.Calendar;
         var Draggable = FullCalendar.Draggable;

        let containerEl = document.getElementById('external-event');
        let calendarEl = document.getElementById('calendar');

        let calendar = new FullCalendar.Calendar(calendarEl, {
         headerToolbar:{
        right: 'today,prev,next',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek'
         },

         // initialView: 'timeGridWeek',
          droppable : true,
          editable  : true,
          selectable: true,

          events: [],

          /*event click is going to work well here now I need to try and figure out if it's going to work with user
          input and flask */

          /* okay so I will need to edited eventClick so it can work to change the title and uploading files rather
          than alerts if I can */

          /* I might even look at wtfroms and or wtf flask for this area */

          eventClick: function(info) {

            alert('Event: ' + info.event.title);
            alert('Date: ' + info.event.start);
            alert('Date: ' + info.event.end);
            //alert('View: ' + info.view.type);
            alert("CLICKED!");
           // toEditItem(info.event);



             //document.getElementById('start').value = info.dateStr;
            // document.getElementById('title').textContent =  "Register the Event";
            //  myForm.show();



            /* need to figure out where info.el.style is within css because the blue border on the events looks bad */
            info.el.style.borderColor = 'pink';
            //  event.backgroundColor = 'red';
          }
        });
        calendar.render();


    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
        return {
            title: eventEl.innerText
                };
        }
    });

    function toEditItem(event)
    {   showEditModelBox();
        let id;

        if(event.target.dataset)
        id = event.target.dataset.id;
        else
        id = event.id;
        console.log(id);

        preFillEditForm(id);
    }
/*function preFillEditForm(id)
    {
        let result = todoList.find(todoObj => todoObj.id == id);
                let {title, start, end} = results;

                document.getElementById("title").value = title;
                document.getElementById("start").value = start;
                document.getElementById("end").value = end;

                changeBtn.dataset.id = id;
    }*/

    function buttonTest()
    {
        //var element = document.getElementById("edit-events");
        //element.classList.toggle("slideIntoView");
    }

    function closeEditModalBox(event)
    {
       // document.getElementById("edit-events").classList.remove("slideIntoView");
    }


   });
  function buttonTest()
    {
     /*the problem was that the script was not located within the body area of the work and-or the function was
      inside the function for the calendar that could be it as well! */

       var open = document.getElementById("edit-events");
       open.classList.toggle("slideIntoView");
    }
function myButton()
    {
     var element = document.getElementById("myDIV");
     element.classList.toggle("style-test");
    }





























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