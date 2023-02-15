function showListing(d) {
    let type = 'ul'
    let itemTitle = d.data().itemTitle
    let description = d.data().description
    let price = d.data().price
    let phoneNum = d.data().phoneNum
  
    let textline = `${itemTitle}: ${description} | Price: ${price} | Contact: #${phoneNum}`
    type = document.createElement(type)
    type.appendChild(document.createTextNode(textline))
    document.getElementById('all-listings').appendChild(type)
    // TITLE: DESCRIPTION, Price: PRICE, Contact: PHONE NUMBER, Tag(s): TAGS, Condition: CONDITION, 
  
  }
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
let testData;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
/* Fetching the data from the server and then converting it to JSON. */
fetch('http://localhost:3000/listings')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    testData = data;
  })
  //can use then() to call another function and pass in JSON stuff
  .then(() => {
    console.log(testData);
   });
