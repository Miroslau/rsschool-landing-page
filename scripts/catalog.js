let productsData = [];
let defaultCategory = 'coffee';

const listContainer = document.querySelector('.menu-list');
const loadMoreBtn = document.getElementById('load-more');
const modalOverlay = document.getElementById('product-modal');
const modalContainer = document.getElementById('modal-content');
const bodyElement = document.body;

const tabButtons = document.querySelectorAll('.tab-button');

async function getProducts() {
    try {
        const response = await fetch('./products.json');

        if (!response.ok) {
            throw new Error('Error getting products');
        }

        productsData = await response.json();

        renderProductByCategory(defaultCategory);
        setupTabs();
    } catch (error) {}
}

function renderProductByCategory(category) {
    if (!listContainer) return;
    listContainer.innerHTML = '';

    const filteredProducts = productsData.filter((product) => product.category === category);

    filteredProducts.forEach((product, index) => {
        const item = document.createElement('li');
        item.className = 'menu-list__item js-card';

        const imageNumber = index + 1;

        const {name, description, price} = product;

        item.innerHTML = `
            <div class="menu-list__image-box">
                <img class="menu-list__img" src="./pictures/png/${category}-${imageNumber}.png" alt="${product.name}">
            </div>
            <div class="menu-list-content">
                <h2 class="menu-list-content__title">${name}</h2>
                <p class="menu-list-content__description">${description}</p>
                <p class="menu-list-content__price">$${price}</p>
            </div>
        `;

        listContainer.append(item);
    });

    handleLoadMoreVisibility();
}

function setupTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');

            if (selectedCategory === defaultCategory) return;

            defaultCategory = selectedCategory;

            tabButtons.forEach(button => {
                button.classList.remove('tab-button_active');
            });

            button.classList.add('tab-button_active');

            renderProductByCategory(defaultCategory);
        })
    })
}

function handleLoadMoreVisibility() {
    if (!loadMoreBtn) return;
    const allRenderedCards = document.querySelectorAll('.js-card');

    if (allRenderedCards.length > 4) {
        loadMoreBtn.classList.remove('is-hidden')
    } else {
        loadMoreBtn.classList.add('is-hidden')
    }
}

function openModal(product) {
    if (!modalOverlay || !modalContainer) return;

    modalContainer.innerHTML = `
        <div class="modal-conent">
            <div class="product">
                <div class="product__title">
                    <h2 class="product__name">${product.name}</h2>
                    <p class="product__description">${product.description}</p>
                </div>
                <form class="product__form" id="product-form">
                   <div class="product-section">
                        <span class="product__description">Size</span>
                        <div class="product-options">
                            <label class="option-button">
                                <input type="radio" name="size" value="s" data-add-price="${product.sizes.s['add-price']}" checked>
                                <span class="option-button__icon">S</span>
                                <span class="option-button__text">${product.sizes.s.size}</span>
                            </label>
                            <label class="option-button">
                                <input type="radio" name="size" value="m" data-add-price="${product.sizes.m['add-price']}">
                                <span class="option-button__icon">M</span>
                                <span class="option-button__text">${product.sizes.m.size}</span>
                            </label>
                            <label class="option-button">
                                <input type="radio" name="size" value="l" data-add-price="${product.sizes.l['add-price']}">
                                <span class="option-button__icon">L</span>
                                <span class="option-button__text">${product.sizes.l.size}</span>
                            </label>
                        </div>
                    </div>
                   <div class="product-section">
                        <span class="product__description">Additives</span>
                        <div class="product-options">
                            ${product.additives.map((additive, index) => `
                                <label class="option-button">
                                    <input type="checkbox" name="additive" value="${additive.name.toLowerCase()}" data-add-price="${additive['add-price']}">
                                    <span class="option-button__icon">${index + 1}</span>
                                    <span class="option-button__text">${additive.name}</span>
                                </label>
                            `).join('')}
                        </div>
                   </div>
                </form>
                <div class="product__total">
                    <span>Total:</span>
                    <span class="product__total-price" id="product-price">$${product.price}</span>
                </div>
                <div class="product-info">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_147813_10215)">
                            <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_147813_10215">
                                <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="product-info__text">
                        The cost is not final. Download our mobile app to see the
                        final price and place your order. Earn loyalty points and
                        enjoy your favorite coffee with up to 20% discount.
                    </span>
                </div>
                <button>close</button>
            </div>
        </div>
    `;

    modalOverlay.classList.add('is-open');
    bodyElement.classList.add('lock-scroll');

    const form = document.getElementById('product-form');
    const totalPriceElement = document.getElementById('product-price');

    const basePrice = parseFloat(product.price);

    if (form) {
        form.addEventListener('change', () => {
            const newPrice = calculatePrice(basePrice, form)
            totalPriceElement.textContent = `$${newPrice.toFixed(2)}`
        })
    }


}

function calculatePrice(currentTotalPrice, formElement) {
    const selectedSizeInput = formElement.querySelector('input[name="size"]:checked');

    if (selectedSizeInput) {
        const sizeAddPrice = parseFloat(selectedSizeInput.getAttribute('data-add-price') || 0);
        currentTotalPrice += sizeAddPrice;
    }

    const selectedAdditives = formElement.querySelectorAll('input[name="additive"]:checked');

    selectedAdditives.forEach(checkbox => {
        const additiveAddPrice = parseFloat(checkbox.getAttribute('data-add-price') || 0);
        currentTotalPrice += additiveAddPrice;
    })

    return currentTotalPrice;
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('is-open');
        bodyElement.classList.remove('lock-scroll')
    }
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const hiddenCards = listContainer.querySelectorAll('.js-card:not(.is-visible)');
        hiddenCards.forEach((card, index) => {
            if (index >= 4) {
                card.classList.add('is-visible');
            }
        });
        loadMoreBtn.classList.add('is-hidden');

    });
}

if (listContainer) {
    listContainer.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.menu-list__item');

        if (!clickedCard) return;

        const productName = clickedCard.querySelector('.menu-list-content__title').textContent;

        const chosenProduct = productsData.find((product) => product.name === productName);

        console.log('clickedCard: ', chosenProduct);

        openModal(chosenProduct);
    } );
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    })
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal();
    }
})

getProducts();
