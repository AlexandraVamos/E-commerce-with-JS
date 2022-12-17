$(document).ready(function (e) {

    let objectList = [];
    for (let i = 0; i < jsonObject.products.length; i++) {
        objectList.push(jsonObject.products[i].title);
    }

    for (let i = 0; i < objectList.length; i++) {
        var li = document.createElement('div');
        li.innerHTML = '<a class="mov" href="product.html?product=' + jsonObject.products[i].id + '">' + objectList[i] + '</a>'
        document.getElementById("search-items").appendChild(li);
    }

    var input = document.getElementById("myInput");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("click-btn").click();
        }
    });

    //some test by query
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let sort_type = params.sort_type;
    let toSearch = params.search;


    if (sort_type == "Ascending") {
        ascSort();
    }
    if (sort_type == "Descending") {
        descSort();
    }
    if (sort_type == null) {
        if (toSearch != null) {
            debounce(searchFunction(toSearch), 500);
        }
        else {
            ascSort();
        }
    }

});
const processChange = debounce(() => filterFunction());

function searchSuggestions() {

}
function searchFunction(toSearch) {
    document.getElementById("product-container").innerHTML = "";
    jsonObject.products.forEach((i) => verify(i, toSearch));
}

function ascSort() {
    document.getElementById("product-container").innerHTML = "";
    jsonObject.products.sort(function (first, second) {
        return first.price - second.price
    });
    jsonObject.products.forEach((i) => loadProducts(i));
}

function descSort() {
    document.getElementById("product-container").innerHTML = "";
    jsonObject.products.sort(function (first, second) {
        return first.price - second.price
    });
    jsonObject.products.reverse();
    jsonObject.products.forEach((i) => loadProducts(i));
}

function loadProducts(data) {

    let buttonText = "Add to Cart";
    if (localStorage.getItem(data.id.toString()) != null) {
        buttonText = "Remove"
    }

    var li = document.createElement('li');
    let link = "product.html?product=" + data.id;
    li.innerHTML = ' <div class="product-container">' +
        '<div class="product-card"> ' +
        '<div class="produs"> ' +
        '<div class="product-image">' +
        '<button class="details-btn"><a href=' + link + '><img src=' + data.images[0] + ' class="product-thumb" alt="' + data.description + '"> </a></button>' +
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
        '</div>'
        ;
    document.getElementById("product-container").appendChild(li);
}

function verify(data, toCheck) {

    let buttonText = "Add to Cart";
    if (localStorage.getItem(data.id.toString()) != null) {
        buttonText = "Remove"
    }
    var li = document.createElement('li');
    let link = "product.html?product=" + data.id;
    if (data.title.includes(toCheck)) {
        li.innerHTML = ' <div class="product-container">' +
            '<div class="product-card"> ' +
            '<div class="produs"> ' +
            '<div class="product-image">' +
            '<button class="details-btn"><a href=' + link + '><img src=' + data.images[0] + ' class="product-thumb" alt="' + data.description + '"> </a></button>' +
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

    var x = document.getElementById("addDiv" + id.toString());

    if (x.innerHTML === "Add to Cart") {
        window.localStorage.setItem(id.toString(), id);
        x.innerHTML = "Remove";
    } else {
        x.innerHTML = "Add to Cart";
        removeItem(id);

    }
}

function removeItem(id) {
    localStorage.removeItem(id);

};

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    }
};
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}