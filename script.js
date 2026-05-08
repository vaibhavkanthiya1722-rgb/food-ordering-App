// ======================================
// FOOD ORDERING APP JAVASCRIPT
// ======================================

let cartCount = 0;

let cartItems = [];

// ELEMENTS

const cartBtn =
    document.getElementById("cart-btn");

const addCartButtons =
    document.querySelectorAll(".add-cart");

const orderBtn =
    document.getElementById("order-btn");

const claimOfferBtn =
    document.getElementById("claim-offer-btn");

// ADD TO CART

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const foodCard =
            button.parentElement;

        const foodName =
            foodCard.querySelector("h3").innerText;

        const foodPrice =
            foodCard.querySelector(".price").innerText;

        cartItems.push({
            name: foodName,
            price: foodPrice
        });

        cartCount++;

        cartBtn.innerText =
            `Cart (${cartCount})`;

        alert(`${foodName} added to cart!`);

    });

});

// OPEN CART

cartBtn.addEventListener("click", () => {

    if (cartItems.length === 0) {

        alert("🛒 Your cart is empty!");

        return;
    }

    let cartMessage =
        "🛒 Your Cart Items:\n\n";

    let totalPrice = 0;

    cartItems.forEach((item, index) => {

        cartMessage +=
            `${index + 1}. ${item.name} - ${item.price}\n`;

        totalPrice += parseInt(
            item.price.replace("₹", "")
        );

    });

    cartMessage +=
        `\n----------------------\n`;

    cartMessage +=
        `Total Amount: ₹${totalPrice}`;

    alert(cartMessage);

});

// ORDER BUTTON

orderBtn.addEventListener("click", () => {

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

});

// CLAIM OFFER

claimOfferBtn.addEventListener("click", () => {

    alert(
        "🎉 Coupon Code FOOD50 Applied Successfully!"
    );

});