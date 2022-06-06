todoMain();
function todoMain()
{
  const DEFAULT_OPTION = "Choose category";
  //variables
  let inputElem,
      inputElem2,
      dateInput,
      timeInput,
      selectElem,
      todoList =[];
  //functions
  getElements();
  addListeners();
  renderRows(todoList);
  updateSelectOptions();
//  multipleFilter();

  //These should be within "addListeners" function but I still need to figure why they aren't working in there?
  // add event for calendar
  addButton.addEventListener("click", addEntry, false);
  //sort event by category
  sortButton.addEventListener("click", sortEntry, false);

//Finding elements within the html file
function getElements()
{
  inputElem = document.getElementsByTagName("input")[0];
  inputElem2 = document.getElementsByTagName("input")[1];
  selectElem = document.getElementById("categoryFilter")
  dateInput = document.getElementById("dateInput");
  timeInput = document.getElementById("timeInput");
  sortButton = document.getElementById("sortBtn");
  addButton = document.getElementById("addBtn");

}
function addListeners()
{

//This area here is still a work in process

}
  //closing the modal box once again I still need to figure out how to implement into the "addListeners()" function
  document.getElementById("event-modal-close-btn").addEventListener("click", closeEditModalBox, false);

// code for the calendar and the implementations of dates, months and as well for making events draggable and clickable
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
            toEditItem(info.event);
            info.el.style.borderColor = 'pink';

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
   });

   //This area is opening the modal once the event is clicked on
   function toEditItem(event)
    { showEditModalBox();
    let id;
    if(event.target)
        id = event.target.dataset.id;
    else
        id = event.id;

    fillEditForm(id);
    }
    //modal pop-up screen
    function  showEditModalBox()
    {
      document.getElementById("edit-events").classList.add("slideIntoView");
    }
    //closing modal box
    function closeEditModalBox()
    {
   document.getElementById("edit-events").classList.remove("slideIntoView");
    }
    //Area to implement changes within the modal of event
    function addEntry(event)
    {
       let inputValue = inputElem.value;
        inputElem.value = "";

        let inputValue2 = inputElem2.value;
        inputElem2.value = "";

        let dateValue = dateInput.value;
        dateInput.value = "";

        let timeValue = timeInput.value;
        timeInput.value = "";

        let obj = {
            id: _uuid(),
            todo: inputValue,
            category: inputValue2,
            date: dateValue,
            time: timeValue,
            done: false,

        };

        renderRow(obj);

        todoList.push(obj);

        save();

        updateSelectOptions();


    }

    //Choosing the category but it doesn't save it within the code so I need to figure out why it's doing that
    function updateSelectOptions()
    {
     let options = [];

   todoList.forEach((obj) => {
      options.push(obj.category);
    });
   let optionsSet = new Set(options);

   selectElem.innerHTML = "";
   let newOptionElem = document.createElement('option');
   newOptionElem.value = DEFAULT_OPTION;
   newOptionElem.innerText = DEFAULT_OPTION;
  //"choose category"
   selectElem.appendChild(newOptionElem);

   for(let option of optionsSet)
   {
        let newOptionElem = document.createElement('option');
        newOptionElem.value = option;
        newOptionElem.innerText = option;
      selectElem.appendChild(newOptionElem);
  }
}
    // events should save within the code but it's not working right now
    function save()
    {
    let stringfield = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringfield);
    }
    //loading the code for saved events
    function load()
    {
        let retrieved = localStorage.getItem("todoList");
        todoList = JSON.parse(retrieved);
        if (todoList == null)
            todoList = [];

    }

    //Render the tables and has influence over the calendar code
    function renderRows(arr){
    arr.forEach(todoObj => {
        renderRow(todoObj)
    })
}

//displays saved event and table of events It is still a big work in process right now...

 function renderRow({ todo: inputValue, category: inputValue2, id, date, time, done }) {

    let table = document.getElementById("todoTable");

    let trElem = document.createElement("tr");
    table.appendChild(trElem);
   /* trElem.draggable = "true";
    trElem.dataset.id = id;*/

    let checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
   // checkboxElem.addEventListener("click", checkboxClickCallback, false);
   // checkboxElem.dataset.id = id;
   let tdElem1 = document.createElement("td");
    tdElem1.appendChild(checkboxElem);
    trElem.appendChild(tdElem1);

   let dateElem = document.createElement("td");

    //dateElem.innerText = formatDate(date);
    trElem.appendChild(dateElem);

    // time cell
    let timeElem = document.createElement("td");
    timeElem.innerText = time;
    trElem.appendChild(timeElem);

    // to-do cell
    let tdElem2 = document.createElement("td");
    tdElem2.innerText = inputValue;
    trElem.appendChild(tdElem2);

    // category cell
    let tdElem3 = document.createElement("td");
   // tdElem3.innerText = inputValue2;
    tdElem3.className = "categoryCell";
    trElem.appendChild(tdElem3);

    // edit cell
    let editSpan = document.createElement("span");
   //  editSpan.innerText = "edit";
    editSpan.className = "material-icons";
    editSpan.addEventListener("click", toEditItem, false);
    editSpan.dataset.id = id;
    let editTd = document.createElement("td");
    editTd.appendChild(editSpan);
    trElem.appendChild(editTd);


    // delete cell
    let spanElem = document.createElement("span");
    spanElem.innerText = "delete";
    spanElem.className = "material-icons";
    spanElem.addEventListener("click", deleteItem, false);
    spanElem.dataset.id = id;
    let tdElem4 = document.createElement("td");
    tdElem4.appendChild(spanElem);
    trElem.appendChild(tdElem4);


    // done button
    checkboxElem.type = "checkbox";
    checkboxElem.checked = done;
    if (done) {
      trElem.classList.add("strike");
    } else {
      trElem.classList.remove("strike");
    }

    addEvent({
      id: id,
      title: inputValue,
      start: date,
    });

    dateElem.dataset.type = "date";
    dateElem.dataset.value = date;
    timeElem.dataset.type = "time";
    tdElem2.dataset.type = "todo";
    tdElem3.dataset.type = "category";

    dateElem.dataset.id = id;
    timeElem.dataset.id = id;
    tdElem2.dataset.id = id;
    tdElem3.dataset.id = id;

    function deleteItem() {
      trElem.remove();
      updateSelectOptions();

      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == this.dataset.id)
          todoList.splice(i, 1);
      }
      save();

      // remove from calendar
      calendar.getEventById( this.dataset.id ).remove();
    }

    function checkboxClickCallback() {
      trElem.classList.toggle("strike");
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == this.dataset.id)
          todoList[i]["done"] = this.checked;
      }
      save();
    }

  }
    //implementing data
    function _uuid()
    {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
          d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    //sorting the entry of the submitted event it's also suppose to sort the entry by category but that is not working right now
    function sortEntry()
    {
        todoList.sort((a, b) => {
            let aDate = Date.parse(a.date);
            let bDate = Date.parse(b.date);
            return aDate - bDate;
        })

        save();

        clearTable();

        renderRows(todoList);


    }
    // clears the current table of event
    function clearTable()
    {
        let trElems = document.getElementsByTagName("tr");
        for (let i = trElems.length - 1; i > 0; i--)
        {
            trElems[i].remove();
        }

        calendar.getElements().forEach(event=>event.remove());
    }

    function commitEdit(event)
    {
        closeEditModalBox();
        let id = event.target.dataset.id;
        document.getElementById("todo-Title").value = todo;
        document.getElementById("todo-Category").value = category;
        document.getElementById("todo-Date").value = date;
        document.getElementById("todo-Time").value = time;

       for( let i = 0; i < todoList.length; i++){

          if(todoList[i].id == id){
            todoList[i] = {
              id  : id,
              todo : todo,
              category : category,
              date : date,
              time : time
            };

            addEvent({
              id: id,
              title: todoList[i].todo,
              start: todoList[i].date,
            });
          }
          save();

          for(let i = 0; i < tdNodeList.length; i++){
          if(tdNodeList[i].dataset.id == id){
           let type = tdNodeList[i].dataset.type;
            switch(type){
              case "date" :
              tdNodeList[i].innerText = formatDate(date);
                break;
              case "time" :
                tdNodeList[i].innerText = time;
                break;
              case "todo" :
                tdNodeList[i].innerText = todo;
                break;
              case "category" :
                tdNodeList[i].innerText = category;
                break;

              }
            }
       }


    }

      function onTableClicked(event){
        if(event.target.matches("td") && event.target.dataset.editable == "true"){
          let tempInputElem;
          switch(event.target.dataset.type){
            case "date" :
              tempInputElem = document.createElement("input");
              tempInputElem.type = "date";
              tempInputElem.value = event.target.dataset.value;
              break;
            case "time" :
              tempInputElem = document.createElement("input");
              tempInputElem.type = "time";
              tempInputElem.value = event.target.innerText;
              break;
            case "todo" :
            case "category" :
              tempInputElem = document.createElement("input");
              tempInputElem.value = event.target.innerText;

              break;
            default:
          }
          event.target.innerText = "";
          event.target.appendChild(tempInputElem);

          tempInputElem.addEventListener("change", onChange, false);


        }
      }
      function onChange(event)
      {
        let changeValue = event.target.value;
        let id = event.target.parentNode.dataset.id;
        let type = event.target.parentNode.dataset.type;

        calendar.getEventById( id ).remove();

        todoList.forEach (todoObj => {
            if(todoObj.id == id){
              //todoObj.todo = changedValue;
              todoObj[type] = changedValue;

              addEvent({
                id: id,
                title: todoObj.todo,
                start: todoObj.date,});

            }
        });

        save();

         if(type == "date"){
            event.target.parentNode.innerText = formatDate(changedValue);
          }else{
            event.target.parentNode.innerText = changedValue;
          }

      }

    }

}



