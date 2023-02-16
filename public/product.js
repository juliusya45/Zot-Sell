const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id')

fetch(`/showItem?id=${id}`)
  .then((response) => response.json())
  .then((data) => {

    title = document.getElementById('nametext')
    title.innerHTML = data.itemTitle

    price = document.getElementById('price')
    price.innerHTML = 'Price: $'+ data.price

    contact = document.getElementById('contact')
    contact.innerHTML = 'Contact: ' + data.phoneNum

    datePosted = document.getElementById('date-posted')
    datePosted.innerHTML = 'Date Posted: ' + data.datePosted

    available = document.getElementById('available')
    available.innerHTML = data.quantity + ' available'

    condition = document.getElementById('condition')
    let c;
    if (data.isNew) {
        c = 'New'
    }
    else if (data.isGood) {
        c = 'Good'
    }
    else if (data.isAcceptable) {
        c = 'Acceptable'
    }
    condition.innerHTML = 'Condition: ' + c

    tags = document.getElementById('tags')

    let tagsArray = []

    if (data.isJewelry) {
        tagsArray.push('Jewelry')
    }
    if (data.isElectronics) {
        tagsArray.push('Electronics')
    }
    if (data.isShoes) {
        tagsArray.push('Shoes')
    }
    if (data.isClothing) {
        tagsArray.push('Clothing/Accessories')
    }
    if (data.isAthletics) {
        tagsArray.push('Athletics')
    }

    tt = document.getElementById('tags-title')
    tt.innerHTML = 'Tag(s):'

    ul = document.getElementById('tags')
    for (let i=0; i < tagsArray.length; i++) {
        let oneTag = document.createElement('li')
        oneTag.appendChild(document.createTextNode(tagsArray[i]))
        oneTag.classList.add('info')
        ul.appendChild(oneTag)
    }

    product = document.getElementById('product-description')
    product.innerHTML = data.description

    img = document.getElementById('product-imgbox')
    img.style.backgroundImage = `url(${data.imgUrl})`

  })
