const createFooter = () => {
    let footer = document.querySelector('.footer');

    footer.innerHTML = `
    <div class="footer-content">
            <img src="img/dark-logo.png" class="logo" alt="">
            <div class="terms">
                <p id="t">Terms & Conditions<span>Privacy Policy</span></p>
            </div>
            <div class="logos">
                <a href="#"><img src="img/media1.svg" class="media-icons" alt=""></a>
                <a href="#"><img src="img/media2.svg" class="media-icons" alt=""></a>
                <a href="#"><img src="img/media3.svg" class="media-icons" alt=""></a>
                <a href="#"><img src="img/media4.svg" class="media-icons" alt=""></a>
            </div>
        </div>
    `;
}

createFooter();
