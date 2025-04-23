window.onmousedown = function(event) {
    console.log(event.button);  // OK: event is MouseEvent
    console.log(event.kangaroo);    // Error: Property 'kangaroo' does not exist on type 'MouseEvent'.
}

window.onscroll = function(event) {
    console.log(event.button);  // Error: Property 'button' does not exist on type 'Event'.
}

const handler = function(event){
    console.log(event.button);  // OK: event is Event
}