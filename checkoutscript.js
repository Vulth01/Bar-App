
import { database } from "./firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const confirmCheckoutBtn = document.getElementById('confirm-checkout');
    const backButton = document.getElementById('back-btn');

    // Function to retrieve cart items from local storage
    function getCartItems() {
        let cartItems = [];
        if (localStorage.getItem('cart')) {
            cartItems = JSON.parse(localStorage.getItem('cart'));
        }
        return cartItems;
    }

    // Function to display cart items
    function displayCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        const cartItems = getCartItems();

        cartItems.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('cart-item');

            itemElement.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">R ${item.price.toFixed(2)}</span>
                <span class="cart-item-quantity">${item.quantity}</span>
                <span class="cart-item-total">R ${(item.price * item.quantity).toFixed(2)}</span>
            `;

            cartItemsList.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: R ${total.toFixed(2)}`;
    }

    // Display cart items initially
    displayCart();

    // Event listener for confirm checkout button
    confirmCheckoutBtn.addEventListener('click', function() {
        // Placeholder for checkout logic
        alert('Proceeding with checkout...'); // Replace with actual checkout logic
    });

    // Event listener for back button
    backButton.addEventListener('click', function() {
        history.back(); // Navigate back in history
    });
});
