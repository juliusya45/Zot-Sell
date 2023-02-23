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
const bimg = { encodedStr: ''};

function anyValsMissing(li) {
    for (let i = 0; i < li.length; i++) {
        if (!li[i]) {
            return true
        }
    }
    return false
}

function onButtonClick(e) {

    if (e) {
        e.preventDefault();
    }

    async function readFile(event) {
        //converts img to blob file
        bimg.encodedStr = event.target.result;
        bimg.encodedStr = _arrayBufferToBase64(bimg.encodedStr);
    };
    
    var input = document.querySelector('input[type=file]');;
    async function changeFile() {
        var file = input.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', readFile)
        reader.readAsArrayBuffer(file);
        console.log("is:" + bimg);
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


    input.addEventListener('change', changeFile);
    console.log([itemTitle, description, price, datePosted, quantity, 
    phoneNum, meetingSpot, img, isNew, isGood, isAcceptable, isClothing, isElectronics, isShoes, isAthletics, isJewelry, bimg.encodedStr])
    console.log({"img": bimg.encodedStr})
    
    requiredVals = [itemTitle, description, price, datePosted, quantity, 
        phoneNum, img]
    
    if (!anyValsMissing(requiredVals)) {
        sendFormData();
    } 
}

const btn = document.querySelector("#submitListingBtn");
btn.addEventListener('click', function(e) {
    onButtonClick(e)
});

onButtonClick(null);

function sendFormData(url='', data={})
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
        picture: bimg.encodedStr,
        isClothing: isClothing,
        isElectronics: isElectronics,
        isShoes: isShoes,
        isAthletics: isAthletics,
        isJewelry: isJewelry,
        isNew: isNew,
        isGood: isGood,
        isAcceptable: isAcceptable
    };

    console.log('Before fetch call');

    fetch('/addlisting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)  
    }).then(res => {
        console.log('res received')
        window.location.href = "index.html";
    })
    .catch(error => console.log('Form POST error.'))

}

//https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

