let itemTitle;
let description;
let phoneNum;
let meetingSpot;
let price;
let datePosted;
let quantity;
let img;
let isClothing;
let isElectronics;
let isShoes;
let isAthletics;
let isJewelry;

function anyValsMissing(li) {
    for (let i = 0; i < li.length; i++) {
        if (!li[i]) {
            return true
        }
    }
    return false
}

const btn = document.querySelector("#submitListingBtn");
btn.addEventListener('click', function(e) {

    e.preventDefault();

    // Strings
    itemTitle = document.getElementById('item-title').value
    description = document.getElementById('description').value
    phoneNum = document.getElementById('phone-num').value
    meetingSpot = document.getElementById('meeting-spot').value

    // Numbers
    price = document.getElementById('price').value
    datePosted = document.getElementById('date-posted').value
    quantity = document.getElementById('quantity').value
    img = document.getElementById('img').value

    // Bools
    isNew = document.getElementById('new').checked
    isGood = document.getElementById('good').checked
    isAcceptable = document.getElementById('acceptable').checked
    isClothing = document.getElementById('clothing').checked
    isElectronics = document.getElementById('electronics').checked
    isShoes = document.getElementById('shoes').checked
    isAthletics = document.getElementById('athletics').checked
    isJewelry = document.getElementById('jewelry').checked

    console.log('yo yo!')

    console.log([itemTitle, description, price, datePosted, quantity, 
    phoneNum, meetingSpot, img, isNew, isGood, isAcceptable, isClothing, isElectronics, isShoes, isAthletics, isJewelry])

    requiredVals = [itemTitle, description, price, datePosted, quantity, 
        phoneNum, img]

    if (!anyValsMissing(requiredVals)) {
        sendFormData();
        window.location.href = "index.html";
    }

});

async function sendFormData(url='', data={})
{
    //creates database
    const listing = {
        itemTitle: itemTitle,
        description: description,
        price: price,
        datePosted: datePosted,
        quantity: quantity,
        phoneNum: phoneNum,
        meetingSpot: meetingSpot,
        img: img,
        isClothing: isClothing,
        isElectronics: isElectronics,
        isShoes: isShoes,
        isAthletics: isAthletics,
        isJewelry: isJewelry,
        isNew: isNew,
        isGood: isGood,
        isAcceptable: isAcceptable
    };

    fetch('/addlisting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    }).then(res => {
        console.log('AOTAJIOJAFOIDOF')
    })
    .then(data => console.log(data))
    .catch(error => console.log('Form POST error.'))
}
