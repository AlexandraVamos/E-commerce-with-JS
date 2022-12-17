$(document).ready(function (e) {
    totalPrice();
});

function createSingleProduct(data) {
    let quantity = 1;
    let id = data.id;
    var li = document.createElement('li');

    li.innerHTML = '<div class="cart-product" id="productNr' + data.id + '">' +
        '<div class="cart-product-img">' +
        '<img src=' + data.images[0] + ' class="card-img" alt="">' +
        '</div>' +
        '<div class="cart-product-info">' +
        '<h2 class="product-name">' + data.title + '</h2>' +
        '<span class="product-price" id="product-price' + data.id + '">$' + Number(data.price - data.discountPercentage / 100 * data.price).toFixed(2) + '</span>' +
        '<span class="product-actual-price">$' + data.price + '</span>' +
        '<span class="product-discount">( ' + data.discountPercentage + '% off )</span>' +
        '<br>' +
        '<span class="counter">' +
        '<button class="trash" onclick="removeItem(' + id + ')"><a >REMOVE</a></button>' +
        '<div class="product-counter">' +
        '<button class="add"><a onclick="upBtn(' + data.id + ')">+</a></button>' +
        '<input type="text" id="quantity' + data.id + '" class="quantityValue" value="1"></input>' +
        '<button class="remove"><a onclick="downBtn(' + data.id + ')">-</a></button>' +
        '</div>' +
        '</span>' +
        '</div>' +
        '</div>';
    document.getElementById("products-container").appendChild(li);
}

function removeItem(id) {
    localStorage.removeItem(id);
    const element = document.getElementById("productNr" + id);
    element.remove();

    var values = getItemsFromLocalStorage()

    let sum = 0;

    for (let i = 0; i < values.length; i++) {
        sum += jsonObject.products[parseInt(values[i]) - 1].price - (jsonObject.products[parseInt(values[i]) - 1].discountPercentage / 100 * jsonObject.products[parseInt(values[i]) - 1].price);
    }

    document.getElementById("price-total").innerHTML = sum.toFixed(2).toString() + " $";

    if (values.length < 1) {
        document.getElementById("products-container").innerHTML = '<div class="empty-cart">The cart is empty</div>'
    }
}

function upBtn(id) {
    document.getElementById("quantity" + id.toString()).value = parseInt(document.getElementById("quantity" + id.toString()).value) + 1;
    document.getElementById("price-total").innerHTML =
        parseFloat(document.getElementById("price-total").textContent.split(" ")[0]) +
        parseFloat(document.getElementById("product-price" + id).textContent.split("$")[1]) + " $";
}

function downBtn(id) {
    if (parseInt(document.getElementById("quantity" + id.toString()).value) > 1) {
        document.getElementById("quantity" + id.toString()).value = parseInt(document.getElementById("quantity" + id.toString()).value) - 1;
        document.getElementById("price-total").innerHTML =
            (parseFloat(document.getElementById("price-total").textContent.split(" ")[0]) -
                parseFloat(document.getElementById("product-price" + id).textContent.split("$")[1])) + " $";
    }
}

function getItemsFromLocalStorage() {
    var values = []
    keys = Object.keys(localStorage)
    i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values

}

function totalPrice() {

    var values = getItemsFromLocalStorage()

    if (values.length < 1) {
        document.getElementById("products-container").innerHTML = '<div class="empty-cart">The cart is empty</div>'
    }
    else {

        let sum = 0;

        for (let i = 0; i < values.length; i++) {
            sum += jsonObject.products[parseInt(values[i]) - 1].price - (jsonObject.products[parseInt(values[i]) - 1].discountPercentage / 100 * jsonObject.products[parseInt(values[i]) - 1].price);
            createSingleProduct(jsonObject.products[parseInt(values[i]) - 1])

        }

        document.getElementById("price-total").innerHTML = sum.toFixed(2).toString() + " $";

    }
}