const createNav = () => {
  let nav = document.querySelector('.navbar');

  nav.innerHTML = `
    <div class="nav">
    <a href="index.html"><img src="img/dark-logo.png" class="brand-logo" alt=""></a>
    <div class="nav-items">
        <a href="cart.html"><img src="img/cart.svg" alt=""></a>
    </div>
    </div>
   <div id="sort">
    <div class="dropdown">
    <button class="dropbtn">Sort By <a href=""><img src="img/sort.svg" class="sort-icon" alt=""></a></button>
    <div class="dropdown-content">
    <a href="index.html?sort_type=Ascending">Ascendent Sort</a>
    <a href="index.html?sort_type=Descending">Descendent Sort</a>
     </div>
    </div>
  </div>`;
}

createNav();