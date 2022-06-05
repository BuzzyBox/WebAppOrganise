todoMain();

function todoMain()
{
    let addButton;
    getElements();
    addListeners();
 //   bntTest2();
   // let calendar;


       /*  function addListeners()
        {
            document.getElementById("event-modal-close-btn").addEventListener("click", closeEditModalBox, false);
        }*/
function getElements()
{
  //  addButton = document.getElementById("submit");
}
function addListeners()
{
    //addButton.addEventListener("click", addEntry, false);
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
          eventClick: function(info) {
          /*
          eventClick: function(info) {
          toEditItem(info.event);
          },*/ // <==Goal


            //alert('Event: ' + info.event.title);
            //alert('Date: ' + info.event.start);
            //alert('Date: ' + info.event.end);
            //alert('View: ' + info.view.type);
            buttonTest();
           // alert("CLICKED!");
            toEditItem(info.event);

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

   /* function toEditItem(event)
    {   showEditModelBox();
        let id;

        if(event.target.dataset)
        id = event.target.dataset.id;
        else
        id = event.id;
        console.log(id);

        preFillEditForm(id);
    } */
/*function preFillEditForm(id)
    {
        let result = todoList.find(todoObj => todoObj.id == id);
                let {title, start, end} = results;

                document.getElementById("title").value = title;
                document.getElementById("start").value = start;
                document.getElementById("end").value = end;

                changeBtn.dataset.id = id;
    } */
/*
    function buttonTest()
    {
        //var element = document.getElementById("edit-events");
        //element.classList.toggle("slideIntoView");
    } */
/*
    function closeEditModalBox(event)
    {
       // document.getElementById("edit-events").classList.remove("slideIntoView");
    }
*/

   });

}
function addEntry(event)
{
    let inputValue = inputElem.value;
    inputElem.value = "";
    let inputValue2 = inputElem2.value;
    inputElem2.value = "";

    let dataValue = dateInput.value;
    dateInput.value = "";
    let timeValue = timeInput.value;
    timeInput.value = "";

    let obj =
    {
        title: inputValue,
        category: inputValue2,
        date: dateValue,
        time: timeValue,
        done: false,

    };

    renderRow(obj);


}
function renderRow({ title: inputValue, category:inputValue2, id, date, time, done})
{

    //edit cell
    let editSpan = document.createElement("span");
    editSpan.innerText = "edit";
    editSpan.addEventListener("click", toEditItem, false);
    editSpan.dataset.id = id;
    let editTd = document.createElement("edit-events");
    editTd.appendChild(editSpan);
    trElem.appendChild(editTd);
}

function toEditItem(event)
{
    showEditModelBox();
    let id;
    if(event.target)
        id = event.target.dataset.id;
    else
        id = event.id;

    fillEditForm(id);
}
function fillEditForm(id)
{
    let result = todoList.find(todoObj => todoObj.id == id);
    let {todo, category, date, time} = result;

    document.getElementById("todo-Title").value = todo;
    document.getElementById("todo-Category").value = category;
    document.getElementById("todo-Date").value = date;
    document.getElementById("todo-Time").value = time;
}
function buttonTest()
    {
     /*the problem was that the script was not located within the body area of the work and-or the function was
      inside the function for the calendar that could be it as well! */
      //var open = document.getElementById("edit-events");
      //open.classList.toggle("slideIntoView");



    }
function showEditModelBox()
{
      document.getElementById("edit-events").classList.add("slideIntoView");
}
function myButton()
  {
   var element = document.getElementById("myDIV");
   element.classList.toggle("style-test");
  }
