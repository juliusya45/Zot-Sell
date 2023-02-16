function showListing(data, listingId='', last=false) {

  if (last) {
    listingObj = data
  }
  else {
    listingObj = data[listingId]
  }

  // Extract data
  let itemTitle = listingObj.itemTitle
  let description = listingObj.description
  let price = listingObj.price
  let phoneNum = listingObj.phoneNum
  let imgUrl = listingObj.imgUrl

  let textline = `${itemTitle}: ${description} | Price: ${price} | Contact: #${phoneNum}`

  // Create div with ID = the listing ID
  let type = 'div'
  type = document.createElement(type)
  type.id = listingId

  // Create listing title
  displayTitle = document.createElement('h2')
  displayTitle.innerHTML = itemTitle
  displayTitle.classList.add('small-text')

  // Create image
  let img = new Image(250, 200)
  if (imgUrl === undefined) {
    img.src = 'placeholder.png'
  } else {
    img.src = imgUrl
  }

  // Create button which navigates to new product page
  moreInfoBtn = document.createElement('button')
  moreInfoBtn.classList.add('button-81')
  moreInfoBtn.innerHTML = 'More Info'
  moreInfoBtn.id = listingId
  moreInfoBtn.onclick = () => {
    w = window.open(url=`Product.html?id=${listingId}`)
  }

  // Append title +image + button -> div -> container
  gridContainer = document.getElementById('grid-container')
  type.appendChild(displayTitle)
  type.appendChild(img)
  type.appendChild(document.createElement('br')) // Line break
  type.appendChild(moreInfoBtn)
  gridContainer.appendChild(type)
  
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

var lastId = 'missing'

/* Fetching the data from the server and then converting it to JSON. */
fetch('/listings')
  .then((response) => response.json())
  .then((data) => {

    for (let id in data) {

      if (data[id].hasOwnProperty('imgUrl')) {
        showListing(data, id)
      }
      else {
        console.log('late id:' + id)
        setTimeout(() => {
          console.log(id)
          fetch('/showItem?id=' + id)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            showListing(data, id, last=true)
          })
        }, 2750)
        
        
      }
      
    }

  })


  
