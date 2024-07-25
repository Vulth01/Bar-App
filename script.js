const drinkSelect = document.getElementById('drink-select');
const addToCartButton = document.getElementById('add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cartItems = [];

// Function to extract drink name from the selected option
function getDrinkName(optionText) {
    // Remove the type and price part from the option text
    const parts = optionText.split(' - ');
    return parts.length > 1 ? parts[1] : optionText;
}

function addToCart(name, price, quantity) {
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    // Store cartItems in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    displayCart();
}

function displayCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.classList.add('cart-item');
        itemElement.dataset.name = item.name;

        itemElement.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-quantity">x ${item.quantity}</span>
            <span class="cart-item-total">R ${(item.price * item.quantity).toFixed(2)}</span>
            <button class="cart-item-remove">Remove</button>
        `;

        cartItemsList.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `R ${total.toFixed(2)}`;

    console.log('Cart Total:', total.toFixed(2));

    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.parentElement.dataset.name;
            removeFromCart(itemName);
        });
    });
}

function removeFromCart(name) {
    cartItems = cartItems.filter(item => item.name !== name);
    displayCart();
}

addToCartButton.addEventListener('click', addToCartFromSelect);

function addToCartFromSelect() {
    const selectedOption = drinkSelect.options[drinkSelect.selectedIndex];

    if (!selectedOption.value) {
        alert('Please select a product.');
        return;
    }

    const optionText = selectedOption.textContent.trim();
    const name = getDrinkName(optionText); // Get only the drink name
    const price = parseFloat(selectedOption.value);
    const quantity = parseInt(document.getElementById('select-quantity').value);

    console.log('Selected Option:', selectedOption);
    console.log('Name:', name);
    console.log('Price:', price);
    console.log('Quantity:', quantity);

    addToCart(name, price, quantity);
}

checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html'; // Make sure this is correct
});

displayCart();




//FIREBASE STUFF


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBNE6getyPeyruCVEhwdXfAHhANHFh0u8U",
    authDomain: "ft-barapp.firebaseapp.com",
    databaseURL: "https://ft-barapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ft-barapp",
    storageBucket: "ft-barapp.appspot.com",
    messagingSenderId: "153671637980",
    appId: "1:153671637980:web:5ee6449e6e6dd4050bcd19",
    measurementId: "G-T7QYFBVSD9"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Example function to add an order to Firestore
function addToFirestore(name, price, quantity) {
  db.collection("orders").add({
    name: name,
    price: price,
    quantity: quantity,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    // Optionally, update UI to reflect successful addition
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    // Handle errors
  });
}

// Modify addToCart function to add to Firestore instead of localStorage
function addToCart(name, price, quantity) {
  // Your addToCart logic here
  addToFirestore(name, price, quantity);
}

// Modify displayCart function to fetch from Firestore instead of localStorage
function displayCart() {
  // Your displayCart logic here, fetching from Firestore
}








