let productsData = [];
let defaultCategory = 'coffee';

const listContainer = document.querySelector('.menu-list');
const loadMoreBtn = document.getElementById('load-more');

async function getProducts() {
    try {
        const response = await fetch('../products.json');

        if (!response.ok) {
            throw new Error('Error getting products');
        }

        productsData = await response.json();

        renderProductByCategory(defaultCategory);
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

function handleLoadMoreVisibility() {
    if (!loadMoreBtn) return;
    const allRenderedCards = document.querySelectorAll('.js-card');

    if (allRenderedCards.length > 4) {
        loadMoreBtn.classList.remove('is-hidden')
    } else {
        loadMoreBtn.classList.add('is-hidden')
    }
}

getProducts();
