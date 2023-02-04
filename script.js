// Get the value of the name input from the form and update the greeting

const greetingText = document.querySelector("#greeting");                   // get greeting element
const inputElement = document.querySelector("#exampleFormControlInput1");   // get input element
const btn = document.querySelector("#exampleFormBtn");                      // get the element with id = 'exampleFormBtn'
btn.addEventListener('click', function() {                                  // add an event to the button: whenever the button is pressed, update the greeting name
    greetingText.innerHTML = `Hello, ${inputElement.value}`;                // this is a templated string in Javscript! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals 
});