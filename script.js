window.addEventListener('click', function (event) {
    
    // ЛОГІКА ЛІЧИЛЬНИКА (для "+" і "-")
    
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');
        let count = parseInt(counter.innerText);
        
        if (event.target.dataset.action === 'plus') {
            counter.innerText = count + 1;
        } 
        
        if (event.target.dataset.action === 'minus') {
            if (count > 1) {
                counter.innerText = count - 1;
            }
        }
    }


    // ЛОГІКА ДОДАВАННЯ В КОШИК

    if (event.target.dataset.action === 'add-to-cart') {
        
        const card = event.target.closest('.product-card');
        
        // 1. Збираємо дані
        const productInfo = {
            id: card.dataset.id,
            name: card.querySelector('[data-product-name]').innerText,
            price: parseInt(card.querySelector('[data-price]').innerText),
            count: parseInt(card.querySelector('[data-counter]').innerText) 
        };

        const cartItemsContainer = document.querySelector('.cart-items');
        const itemInCart = cartItemsContainer.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            // Оновлюємо кількість, якщо товар вже є
            const counterElement = itemInCart.querySelector('[data-cart-counter]');
            const newCount = parseInt(counterElement.innerText) + productInfo.count;
            counterElement.innerText = newCount;

        } else {
            // Створюємо нову картку товару для кошика
            const cartItemHTML = `
                <div class="cart-item" 
                     data-id="${productInfo.id}" 
                     data-cart-price="${productInfo.price}"> <p>
                        **${productInfo.name}**
                        <br>
                        ${productInfo.price} грн x <span data-cart-counter>${productInfo.count}</span> шт.
                    </p>
                    <hr>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);

            // Видаляємо повідомлення "Кошик порожній"
            const emptyMessage = cartItemsContainer.querySelector('.cart-empty-message');
            if (emptyMessage) {
                emptyMessage.remove();
            }
        }

        // Завжди оновлюємо загальну суму після додавання
        updateCartTotal();
    }
});


// ФУНКЦІЯ ПІДРАХУНКУ ЗАГАЛЬНОЇ СУМИ

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
        // Отримуємо ціну безпосередньо з атрибута data-cart-price
        const price = parseInt(item.dataset.cartPrice);
        
        // Отримуємо кількість з data-cart-counter
        const count = parseInt(item.querySelector('[data-cart-counter]').innerText);

        total += price * count;
    });

    // Оновлюємо відображення загальної суми
    document.querySelector('.total-price').innerText = total;
}