const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id')

fetch(`http://localhost:3000/showItem?id=${id}`)
  .then((response) => response.json())
  .then((data) => {

    title = document.getElementById('nametext')
    title.innerHTML = data.itemTitle

    product = document.getElementById('product-description')
    product.innerHTML = data.description

    img = document.getElementById('product-imgbox')
    img.style.backgroundImage = `url(${data.imgUrl})`

  })
