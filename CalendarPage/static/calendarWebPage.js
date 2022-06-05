todoMain();


  getElements();
  addListeners();
  addButton.addEventListener("click", addEntry, false);

function todoMain()
{
  const DEFAULT_OPTION = "choose category";
  let inputElem,
      inputElem2,
      dateInput,
      timeInput,
      todoList =[];


function getElements()
{
  inputElem = document.getElementsByTagName("input")[0];
  inputElem2 = document.getElementsByTagName("input")[1];
  dateInput = document.getElementById("todo-Date");
  timeInput = document.getElementById("todo-Time");
  addButton = document.getElementById("addBtn");

}
function addListeners()
{

    addButton.addEventListener("click", addEntry, false);
    selectElem.addEventListener("change", multipleFilter, false);

}

 // changeBtn = document.getElementById("changeBtn");
 // changeBtn.addEventListener("click", commitEdit, false);
  document.getElementById("event-modal-close-btn").addEventListener("click", closeEditModalBox, false);
/*  let inputElem,
    inputElem2,
    dateInput,
    timeInput,
    addButton,
    sortButton,
    selectElem,
    todoList = [],
    calendar,
    shortlistBtn,
    changeBtn,
    todoTable;

  getElements();
  addListeners();
  initCalendar();
  load();
  renderRows(todoList);
  updateSelectOptions();*/


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
   function toEditItem(event)
{ showEditModalBox();
    let id;
    if(event.target)
        id = event.target.dataset.id;
    else
        id = event.id;

    fillEditForm(id);
}
function  showEditModalBox()
{
      document.getElementById("edit-events").classList.add("slideIntoView");
}
function closeEditModalBox()
{
   document.getElementById("edit-events").classList.remove("slideIntoView");
}
function fillEditForm(id)
{
    //   closeEditModalBox();
   /* let result = todoList.find(todoObj => todoObj.id == id);
    let {todo, category, date, time} = result;

    document.getElementById("todo-Title").value = todo;
    document.getElementById("todo-Category").value = category;
    document.getElementById("todo-Date").value = date;
    document.getElementById("todo-Time").value = time;*/

   // changeBtn.dataset.id = id;

}
 /* function addListeners() {
    addButton.addEventListener("click", addEntry, false);
    sortButton.addEventListener("click", sortEntry, false);
    selectElem.addEventListener("change", multipleFilter, false);
    shortlistBtn.addEventListener("change", multipleFilter, false);

    document.getElementById("todo-modal-close-btn").addEventListener("click", closeEditModalBox, false);

    changeBtn.addEventListener("click", commitEdit, false);
  }*/
}

/*function getElements()
{
    inputElem = document.getElementsByTagName("input")[0];
    inputElem2 = document.getElementsByTagName("input")[1];
    dateInput = document.getElementById("dateInput");
    timeInput = document.getElementById("timeInput");
    sortButton = document.getElementById("sortBtn");
    selectElem = document.getElementById("categoryFilter");
    shortlistBtn = document.getElementById("shortlistBtn");
  //  changeBtn = document.getElementById("changeBtn");
   // addButton = document.getElementById("submit");
}*/





function updateSelectOption()
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
function save()
{
    let stringfield = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringfield);

}
function load()
{
    let retrieved = localStorage.getItem("todoList");
    todoList = JSON.parse(retrieved);
    if (todoList == null)
        todoList = [];

}
function renderRow({ title: inputValue, category:inputValue2, id, date, time, done})
{



    // add a new row
    //
    let table = document.getElementById("edit-events");
    //
    let trElem = document.createElement("tr");
    table.appendChild(trElem);

    // checkbox cell
    //
    let checkboxElem = document.createElement("input");
    //

    checkboxElem.type = "checkbox";
    checkboxElem.addEventListener("click", checkboxClickCallback, false);
    checkboxElem.dataset.id = id;
    let tdElem1 = document.createElement("todoTable");
    tdElem1.appendChild(checkboxElem);
    trElem.appendChild(tdElem1);

    // date cell
    let dateElem = document.createElement("todo-Date");

    //dateElem.innerText = formatDate(date);
    trElem.appendChild(dateElem);

    // time cell
    let timeElem = document.createElement("todo-Time");
    timeElem.innerText = time;
    trElem.appendChild(timeElem);

    // to-do cell
    let tdElem2 = document.createElement("todo-Title");
    //tdElem2.innerText = inputValue;
    trElem.appendChild(tdElem2);

    // category cell
    let tdElem3 = document.createElement("todoTable");
   // tdElem3.innerText = inputValue2;
    tdElem3.className = "ctodo-Category";
    trElem.appendChild(tdElem3);

    // edit cell
    let editSpan = document.createElement("span");
    //editSpan.innerText = "edit";
    editSpan.className = "material-icons";
    //editSpan.addEventListener("click", toEditItem, false); <== to look at
    editSpan.dataset.id = id;
    let editTd = document.createElement("todoTable");
    editTd.appendChild(editSpan);
    trElem.appendChild(editTd);


    // delete cell
    let spanElem = document.createElement("span");
    spanElem.innerText = "delete";
    spanElem.className = "material-icons";
    spanElem.addEventListener("click", deleteItem, false);
    spanElem.dataset.id = id;
    let tdElem4 = document.createElement("todoTable");
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


/*
    let table = document.getElementById("edit-events");
    let trElem = document.getElementById("todo-Title");
    table.appendChild(trElem);

    // Date Cell

    let dateElem = document.createElement("todo-Date");
    trElem.appendChild(dateElem);

    // Time Cell

    let timeElem = document.createElement("todo-Time");
    timeElem.innerText = time;
    trElem.appendChild(timeElem);


    //edit cell
    let editSpan = document.createElement("span");
    editSpan.innerText = "edit";
    //editSpan.addEventListener("click", toEditItem, false);
    editSpan.dataset.id = id;
    let editTd = document.createElement("edit-events");
    editTd.appendChild(editSpan);
    trElem.appendChild(editTd);*/
}

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
          /*case "todo" :
            tdNodeList[i].innerText = todo;
            break;*/
          case "category" :
            tdNodeList[i].innerText = category;
            break;

          }
        }
   }


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
        id: _uuid(),
        title: inputValue,
        category: inputValue2,
        date: dateValue,
        time: timeValue,
        done: false,

    };

    renderRow(obj);

    todoList.push(obj);

    save();

    updateSelectOption();


}
function buttonTest()
    {
     /*the problem was that the script was not located within the body area of the work and-or the function was
      inside the function for the calendar that could be it as well! */
      //var open = document.getElementById("edit-events");
      //open.classList.toggle("slideIntoView");
   }


function myButton()
  {
   var element = document.getElementById("myDIV");
   element.classList.toggle("style-test");
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


}