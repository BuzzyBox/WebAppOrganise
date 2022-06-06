const draggables = document.querySelectorAll('.draggable')
// create const with class draggable what you can drag
const containers = document.querySelectorAll('.container')
 const containerx =document.querySelector('.containerx')
// containers where to drop.

// loop through each pages
draggables.forEach(draggable => {
    //DRAGSTRT EVENT
    draggable.addEventListener('dragstart',()=> {
        draggable.classList.add('dragging')
    })//what happends when we start draghging element

    // DRAGEND EVENT
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

// Allow elements to be dropped in containers
containers.forEach(container=>{
    container.addEventListener('dragover', e =>{
        e.preventDefault() // enable dropping remove default
        const draggable = document.querySelector('.dragging')
        //1 element willl have 'dragging' bc one selected
        container.appendChild(draggable)
       
      //SORT 
        const afterElement = getDragAfterElement(container, e.clientY)
        if(afterElement ==null){
            container.appendChild(draggable)
        }else{
            container.insertBefore(draggable,afterElement)
        }
      
    })
})


//sorting mouse position 
function getDragAfterElement(container, y)
{   //every draggable that we are not dragging
    const draggableelements =  [...container.querySelectorAll('.draggable:not(.dragging)')]
 
  
    return draggableelements.reduce((closest,child)=> {
    const box = child.getBoundingClientRect()
    const offset =(( y - box.top) - box.height) / 2 //mouse position between center boxes
    
    if (offset < 0 && offset > closest.offset)
    {
        return{offset: offset,element: child}
    }else{
          return  closest
        }
      },{offset: Number.NEGATIVE_INFINITY}).element
}
