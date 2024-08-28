    const mainContent = document.querySelector('.page-container');
    const popupWrapper = document.createElement('div');
    
    const productName = document.querySelector('.product-single__title');
    
    const saleTag = document.getElementById('ProductSaleTag-product-template');

    const priceTag = document.getElementById('ProductPrice-product-template');
    const priceCompareTag = document.getElementById('ComparePrice-product-template');


    popupWrapper.classList.add('popup-wrapper');
    popupWrapper.id = 'popupWrapper';
        
    popupWrapper.innerHTML = `
    <div class="bell-icon">
        <svg class="bell-svg" width="24px" heigth="24px" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>    </div>        <svg class="bell-svg" width="24px" heigth="24px" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>    </div>
    </div>

    <div class="sticky-popup" id="stickyPopup">
        <div class="product-header">
            <div class="product-name-wrapper">      
                <button class="close-modal">&times;</button>
                <span class="product-name">${productName.textContent}</span>
                ${priceCompareTag ? `<span class="product-price">$${priceTag.textContent} <s>${priceCompareTag.textContent}</s></span>` : `<span class="product-price">${priceTag.textContent}</span>`}
            </div>

            ${saleTag.classList.contains('hide') ? '' : `<div class="product-tag">Sale</div>`}

        </div>

        <div class="carousel">
            <div class="carousel-images">
                <img src="" id="imgPlaceholder" alt="Imagem 1" class="carousel-image">
            </div>

            <div class="carousel-controls" id="carouselControls"></div>
        </div>

        <div class="product-details">
            <span id="productSize">Size: M</span>
            <span id="productColor">Color: Black</span>
        </div>

        <div class="product-quantity-wrapper">
            <span>Quantity:</span>
            <button type="button" class="quantity-item-btn" id="btnMinus">−</button>
            <span class="quantity-item">1</span>
            <button type="button" class="quantity-item-btn" id="btnPlus">+</button>
        </div>

        <button id="addToCartBtn">Add to Cart</button>
    </div>
        `;

    mainContent.appendChild(popupWrapper);


    const popupStyle = document.createElement('style');

    popupStyle.innerHTML = `
    body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: rgb(253, 210, 229);
}

.cart-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1001;
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;

}

.cart-icon {
    font-size: 24px;
    position: relative;
}

.fa-shopping-cart {
    font-size: 22px;
    margin-top: 4px;
    position: relative;
    cursor: pointer;
    color: #333;
}

.cart-count {
    position: absolute;
    top: -22px;
    right: -16px;
    background-color: red;
    color: white;
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

}

.bell-icon {
    position: fixed;
    top: 86%;
    right: 19px;
    z-index: 1001;
    width: 48px;
    height: 48px;
    background-color: #0071b2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: none;
    font-size: 22px;
    cursor: pointer;

}

.bell-icon:hover {
    transform: scale(1.09);
}

.bell-svg {
    display: inline-block;
    animation: swing 1s infinite;
    border: none;
    fill: white;
}

@keyframes swing {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-15deg);
    }
    50% {
        transform: rotate(0deg);
    }
    75% {
        transform: rotate(15deg);
    }
    100% {
        transform: rotate(0deg);
    }
}


.sticky-popup {
    position: fixed;
    bottom: 88px;
    right: 20px;
    width: 250px;
    padding: 15px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
}

.sticky-popup h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
}

.sticky-popup p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
}

#addToCartBtn {
    display: block;
    margin: 15px auto 0;
    width: 200px;

    border: none;
    border-radius: 4px;

    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 14px;

    transition: transform 0.3s ease;

    padding: 8px;
    font-size: 12px;
}

#addToCartBtn:hover {
    transform: scale(1.02);
    background-color: #0054ae;
}

.cart-container:hover {
    transform: scale(1.08);
}

.product-image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.carousel {
    position: relative;
    width: 100%;
    max-width: 250px;
    margin-bottom: 10px;
    overflow: hidden;
    text-align: center;
}

.carousel-images {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-image {
    min-width: 90%;
    margin-left: 18px;
    border-radius: 4px;
}

.carousel-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;

}

.carousel-btn {
    width: 10px;
    height: 11px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.carousel-btn.active {
    background-color: rgba(0, 0, 0, 0.9);
}

.carousel-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

.cart-container {
    width: 50px;
    height: 50px;
}

.sticky-popup {
    width: 220px;
    padding: 10px;
}

.carousel {
    max-width: 220px;
}

.quantity-item{
    display: inline-block;
    text-align: center;

    width: 20px;
}

.quantity-item-btn{
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #00449c;
}

.mock-content{
    height: 1000px;
}

.product-name{
    font-size: 18px;
    font-weight: 700;   
}

s{
    opacity: 0.5;
    font-size: 12px;
}

.product-header{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0px;
    padding: 12px 14px;
}

.product-name-wrapper{
    display: flex;
    flex-direction: column;
}

.product-price{
    font-size: 16px;
    font-weight: 600;
    color: #00449c;
}

.product-details{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 25px;
    margin: 20px 0 15px;
}

.product-quantity-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px 10px;
}


/* MODAL CART SHOP*/
.modal {
    display: none;

    position: fixed;
    z-index: 5000;
    top: 16px;
    right: 20px;
    height: 120px;
    width: 300px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    animation: transition 0.3s ease;
    transform: translateY(50%);
}

@keyframes transition {
    0% {
        transform: translateY(20%);
        opacity: 0%;
    }
    40% {
        opacity: 30%;
    }
    90% {
        opacity: 90%;
    }
}

.modal-content{
    display: none;
}

.cart-name-modal{
    position: absolute;
    top: 12px;
    left: 13px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

.cart-shoes-img{
    width: 75px;
    height: auto;
    position: absolute;
    top: 40px;
    left: 13px;
    border-radius: 8px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);

}

.cart-shoes-img:hover{
    transform: scale(1.02);
}

.product-name-modal{
    position: absolute;
    top: 50px;
    left: 100px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
}

.product-quantity-modal{
    position: absolute;
    top: 72px;
    left: 100px;
    font-size: 11px;
    color: #555;   
}

.product-value-modal{
    position: absolute;
    top: 72px;
    left: 150px;
    font-size: 11px;
    color: #555; 
}

.product-color-modal{
    position: absolute;
    top: 72px;
    left: 175px;
    font-size: 11px;
    color: #555; 
}

.trash-modal{
    position: absolute;
    top: 56px;
    right: 20px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
}

.fa-trash-alt {
    font-size: 16px;
    cursor: pointer;
    color: red;
}

.clear-all-modal{
    position: absolute;
    top: 102px;
    right: 12px;
    font-size: 10px;
    color: #444444;
    cursor: pointer;
}

.clear-all-modal:hover {
    color: red;
}

#noProductShop{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: 600;
    color: #333;
}

.close-modal {
    position: absolute;
    top: 1px;
    right: 2px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #444444;
    font-weight: bold;
}
.close-modal:hover {
    color: black;
}

.close-modal-cart {
    position: absolute;
    top: 1px;
    right: 2px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #444444;
    font-weight: bold;
}
.close-modal-cart:hover {
    color: black;
}
    `

    document.head.appendChild(popupStyle);

const addToCartBtn = document.getElementById('addToCartBtn');
const quantityProduct = document.querySelector('#Quantity');
const quantityModal = document.querySelector('.quantity-item');

const btnPlus = document.getElementById('btnPlus');
const btnMinus = document.getElementById('btnMinus');


// Minus button click handler
btnMinus.addEventListener('click', function() {
    const quantityValue = parseInt(quantityModal.textContent);
    if (quantityValue > 1) {
        quantityModal.textContent = quantityValue - 1;
        quantityProduct.value = quantityValue - 1;
    }

});

// Plus button click handler
btnPlus.addEventListener('click', function() {
    const quantityValue = parseInt(quantityModal.textContent);
    quantityModal.textContent = quantityValue + 1;

    quantityProduct.value = quantityValue + 1;
});

addToCartBtn.addEventListener('click', function() {
    const cartBtnSite = document.querySelector('button#AddToCart-product-template');
    cartBtnSite.click();
});


const closeModalBtn = document.querySelector('.close-modal');
const bellIcon = document.querySelector('.bell-icon');

// Close sticky popup and show bell icon
closeModalBtn.addEventListener('click', function() {
    stickyPopup.style.display = 'none';
    bellIcon.style.display = 'flex';
});

bellIcon.addEventListener('click', function() {
    stickyPopup.style.display = 'block';
    bellIcon.style.display = 'none';
});



// Carousel setup
let currentIndex = 0;

const productPhotoPlaceholder = document.getElementById('imgPlaceholder');
const carouselImages = document.querySelector('.carousel-images');
const carouselControls = document.getElementById('carouselControls');
const images = document.querySelectorAll('.product-single__photo')

images.forEach((image, index) => {
    
    const btnEl = document.createElement('button');
    btnEl.classList.add('carousel-btn');
    
    if (index === currentIndex) {
        btnEl.classList.add('active');
    }

    btnEl.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });

    carouselControls.appendChild(btnEl);    

    const newImg = productPhotoPlaceholder.cloneNode(true);
    newImg.src = image.querySelector('img').src;
    carouselImages.appendChild(newImg);
});

productPhotoPlaceholder.remove();

function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.carousel-btn').forEach((btnEl, index) => {
        btnEl.classList.toggle('active', index === currentIndex);
    });
}