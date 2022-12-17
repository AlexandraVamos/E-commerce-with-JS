$(document).ready(function (e) {

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let value = params.product;
    jsonObject.products.forEach((i) => loadProducts(i, jsonObject.products[parseInt(value) - 1].category, jsonObject.products[parseInt(value) - 1].id));

    loadProduct(jsonObject.products[parseInt(value) - 1])

    const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
    const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

    let activeImageSlide = 0; // default slider image

    productImageSlide.style.backgroundImage = `url('${jsonObject.products[parseInt(value) - 1].images[0]}')`; // setting up image slider's background image

    productImages.forEach((item, i) => { // loopinh through each image thumb
        item.addEventListener('click', () => { // adding click event to each image thumbnail
            productImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
            item.classList.add('active'); // adding active class to the current or clicked image thumb
            productImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
            activeImageSlide = i; // updating the image slider variable to track current thumb
        })
    })

});

//load product from product page
function loadProduct(data) {
    let buttonText = "Add to Cart";
    let id = data.id;
    if (localStorage.getItem(id.toString()) != null) {
        buttonText = "Remove"
    }

    var li = document.createElement('li');

    li.innerHTML =
        '<section class="product-details">' +
        '<div class="image-slider">' +
        '<div id="image-carusel" class="product-images">' +
        '</div>' +
        '</div>' +
        '<div class="details">' +
        '<h1 class="product-name">' + data.title + '</h1>' +
        '<h2 class="product-brand">' + data.brand + '</h2>' +
        '<h3 class="product-cat-sold">Category: ' + data.category + '</h3>' +
        '<h3 class="product-cat-sold">Sold by: ' + data.seller + '</h3>' +
        '<p class="product-short-des">Description: ' + data.description + '</p>' +
        '<h3 class="product-stock">Stock: ' + data.stock + '</h3>' +
        '<div class="rate">' +
        '<input type="radio" id="star5" name="rate" value="5" />' +
        '<label for="star5" title="text">5 stars</label>' +
        '<input type="radio" id="star4" name="rate" value="4" />' +
        '<label for="star4" title="text">4 stars</label>' +
        '<input type="radio" id="star3" name="rate" value="3" />' +
        '<label for="star3" title="text">3 stars</label>' +
        '<input type="radio" id="star2" name="rate" value="2" />' +
        '<label for="star2" title="text">2 stars</label>' +
        '<input type="radio" id="star1" name="rate" value="1" />' +
        '<label for="star1" title="text">1 star</label>' +
        '</div>' +
        '<h3 class="product-rating">' + data.rating + '</h3>' +
        '<br>' +
        '<span class="product-price">$' + data.price + '</span>' +
        '<span class="product-actual-price">$' + Number(data.price - data.discountPercentage / 100 * data.price).toFixed(2) + '</span>' +
        '<span class="product-discount">( ' + data.discountPercentage + '% off )</span>' +
        '<br>' +
        '<button class="add-cart-btn" onclick="addToLocalStorage(' + id + ')"><a id="addDiv">' + buttonText + '</a></button>' +
        '</div>' +
        '</section>'

    document.getElementById("product-div").appendChild(li);
    for (let i = 0; i < data.images.length; i++) {
        appendImages(data.images[i]);
    }

}

function appendImages(data) {
    var lx = document.createElement('li');
    lx.innerHTML = '<img src=' + data + ' alt="">'
    document.getElementById("image-carusel").appendChild(lx);
}

//load products from suggestions
function loadProducts(data, toCheck, id) {
    let buttonText = "Add to Cart";
    if (localStorage.getItem(data.id.toString()) != null) {
        buttonText = "Remove"
    }

    var li = document.createElement('li');
    let link = "product.html?product=" + data.id;
    if (data.category == toCheck && data.id != id) {
        li.innerHTML = ' <div class="product-container">' +
            '<div class="product-card"> ' +
            '<div class="produs"> ' +
            '<div class="product-image">' +
            '<button class="details-btn"><a href=' + link + '><img src=' + data.images[0] + ' class="product-thumb" alt="' + data.description + '"></a></button>' +
            '</div>' +
            '<div class="product-info">' +
            '<h2 class="product-brand">' + data.title + '</h2>' +
            '<p class="product-short-des">' + data.brand + '</p>' +
            '<p class="rating"><img src="img/star.svg" class="star" alt="">' + data.rating + '</p>' +
            '<span class="price">' + Number(data.price - data.discountPercentage / 100 * data.price).toFixed(2) + ' $</span><span class="actual-price">' + data.price + '</span>' +
            '<span class="discount">' + data.discountPercentage + '%</span>' +
            '<button class="card-btn"><a onclick="addToLocalStorage(' + data.id + ')" id="addDiv' + data.id + '">' + buttonText + '</a></button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    document.getElementById("product-container").appendChild(li);
}

function addToLocalStorage(id) {

    item = id;

    var x = document.getElementById("addDiv");

    if (x.innerHTML === "Add to Cart") {
        window.localStorage.setItem(id.toString(), id);
        x.innerHTML = "Remove";
    } else {
        x.innerHTML = "Add to Cart";
        removeItem(id);
    }


};

function removeItem(id) {
    localStorage.removeItem(id);

};
