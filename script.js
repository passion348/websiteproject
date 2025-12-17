// ВІДКРИТТЯ КОШИКА
const cartBtn = document.getElementById('cart-button');
const cartPopup = document.getElementById('cart-popup');

cartBtn.addEventListener('click', () => {
    cartPopup.classList.toggle('active');
});

// ==========================
// ФУНКЦІЯ: ПОКАЗ / ПРИХОВАННЯ КОШИКА
// ==========================
function toggleCartStatus() {
    const cartItems = document.querySelectorAll('.cart-item');
    const emptyMessage = document.querySelector('.cart-empty-message');
    const orderBtn = document.querySelector('.order-btn');

    if (cartItems.length > 0) {
        emptyMessage.style.display = 'none';
        orderBtn.style.display = 'block';
    } else {
        emptyMessage.style.display = 'block';
        orderBtn.style.display = 'none';
    }
}

// ==========================
// ФУНКЦІЯ: ПІДРАХУНОК СУМИ
// ==========================
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
        const price = +item.dataset.price;
        const count = +item.querySelector('[data-cart-counter]').innerText;
        total += price * count;
    });

    document.querySelector('.total-price').innerText = total;
}

// ==========================
// ОСНОВНА ЛОГІКА
// ==========================
window.addEventListener('click', (event) => {

    // + / -
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const wrapper = event.target.closest('.counter-wrapper');
        const counter = wrapper.querySelector('[data-counter]') || wrapper.querySelector('[data-cart-counter]');
        let value = +counter.innerText;

        if (event.target.dataset.action === 'plus') value++;

        if (event.target.dataset.action === 'minus') {
            if (value === 1 && event.target.closest('.cart-item')) {
                event.target.closest('.cart-item').remove();
                toggleCartStatus();
                updateCartTotal();
                return;
            }
            if (value > 1) value--;
        }

        counter.innerText = value;
        updateCartTotal();
    }

    // ДОДАТИ В КОШИК
    if (event.target.dataset.action === 'add-to-cart') {
        const card = event.target.closest('.product-card');

        const product = {
            id: card.dataset.id,
            name: card.querySelector('[data-product-name]').innerText,
            price: +card.querySelector('[data-price]').innerText,
            count: +card.querySelector('[data-counter]').innerText,
            img: card.querySelector('img').src
        };

        const cartItems = document.querySelector('.cart-items');
        const itemInCart = cartItems.querySelector(`[data-id="${product.id}"]`);

        if (itemInCart) {
            const counter = itemInCart.querySelector('[data-cart-counter]');
            counter.innerText = +counter.innerText + product.count;
        } else {
            cartItems.insertAdjacentHTML('beforeend', `
                <div class="cart-item" data-id="${product.id}" data-price="${product.price}">
                    <img src="${product.img}" width="60">
                    <div>
                        <h4>${product.name}</h4>
                        <div class="items counter-wrapper">
                            <div class="items_control" data-action="minus">-</div>
                            <div class="items_current" data-cart-counter>${product.count}</div>
                            <div class="items_control" data-action="plus">+</div>
                        </div>
                    </div>
                </div>
            `);
        }

        toggleCartStatus();
        updateCartTotal();
    }
    cartPopup.addEventListener('click', (event) => {
        if (!event.target.closest('.cart-wrapper')) {
                cartPopup.classList.remove('active');
            }
        });
});
