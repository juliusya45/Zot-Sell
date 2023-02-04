

const btn = document.querySelector("#submitListingBtn");
btn.addEventListener('click', function() {
    
    let itemTitle = document.getElementById('item-title').value
    let description = document.getElementById('description').value
    let price = document.getElementById('price').value
    let datePosted = document.getElementById('date-posted').value
    let quantity = document.getElementById('quantity').value
    let phoneNum = document.getElementById('phone-num').value
    let meetingSpot = document.getElementById('meeting-spot').value
    let img = document.getElementById('img').value
    let isClothing = document.getElementById('clothing').checked
    let isElectronics = document.getElementById('electronics').checked
    let isShoes = document.getElementById('shoes').checked
    let isAthletics = document.getElementById('athletics').checked
    let isJewelry = document.getElementById('jewelry').checked

    console.log('yo yo!')

    console.log([itemTitle, description, price, datePosted, quantity, 
    phoneNum, meetingSpot, img, isClothing, isElectronics, isShoes, isAthletics, isJewelry])

});

console.log()



