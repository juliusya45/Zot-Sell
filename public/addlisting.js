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
let bimg;

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
    
    var input = document.querySelector('input[type=file]');;
    function changeFile() {
        var file = input.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsArrayBuffer(file);
        console.log("read");
    }

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
    changeFile();
    console.log('yo yo!');

    function readFile(event) {
        //converts img to blob file
        bimg = event.target.result;
        console.log(bimg instanceof ArrayBuffer);
        // var binaryString = String.fromCharCode.apply(null, new Uint8Array(buffer));
        // bimg = btoa(binaryString);
        // //bimg = String.fromCharCode.apply(null, new Uint8Array(bimg))
        // bimg = bimg.toString();
        // console.log(bimg);
        //bimg = u_btoa(bimg);
};

// function u_btoa(buffer) {
//     var binary = [];
//     var bytes = new Uint8Array(buffer);
//     for (var i = 0, il = bytes.byteLength; i < il; i++) {
//         binary.push(String.fromCharCode(bytes[i]));
//     }
//     return btoa(binary.join(''));
// }
  

  //input.addEventListener('change', changeFile);
  console.log([itemTitle, description, price, datePosted, quantity, 
    phoneNum, meetingSpot, img, isNew, isGood, isAcceptable, isClothing, isElectronics, isShoes, isAthletics, isJewelry, bimg])
    //console.log({"img": bimg})
    
    requiredVals = [itemTitle, description, price, datePosted, quantity, 
        phoneNum, img]
    
    if (!anyValsMissing(requiredVals)) {
        sendFormData();
        window.location.href = "index.html";
    }
    sendFormData();



});

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
        //sends blob image into JSON to be dealt with in inbimgdex
        picture: bimg,
        isClothing: isClothing,
        isElectronics: isElectronics,
        isShoes: isShoes,
        isAthletics: isAthletics,
        isJewelry: isJewelry,
        isNew: isNew,
        isGood: isGood,
        isAcceptable: isAcceptable
    };

    fetch('http://localhost:3000/addlisting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)  
    }).then(res => {
        console.log('res received')
    })
    .then(data => console.log(data))
    .catch(error => console.log('Form POST error.'))


}

