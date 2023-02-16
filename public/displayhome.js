function showListing(data, listingId) {

  listingObj = data[listingId]

  let type = 'div'
  let itemTitle = listingObj.itemTitle
  let description = listingObj.description
  let price = listingObj.price
  let phoneNum = listingObj.phoneNum

  let textline = `${itemTitle}: ${description} | Price: ${price} | Contact: #${phoneNum}`
  type = document.createElement(type)
  type.id = listingId
  displayTitle = document.createElement('h2')
  displayTitle.innerHTML = itemTitle
  displayTitle.classList.add('small-text')

  type.appendChild(displayTitle)
  document.getElementById('grid-container').appendChild(type)
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

    for (let id in data) {
      showListing(data, id);
    }

  })
  //can use then() to call another function and pass in JSON stuff
  .then(() => {
    console.log(testData);
   });
