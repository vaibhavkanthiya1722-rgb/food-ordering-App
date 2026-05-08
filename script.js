// ======================================
// FOOD EXPRESS WEBSITE JAVASCRIPT
// ======================================


// ============================
// CART DATA
// ============================

let cartCount = 0;

let cartItems = [];


// ============================
// ELEMENT SELECTION
// ============================

const cartBtn =
    document.getElementById("cart-btn");

const addCartButtons =
    document.querySelectorAll(".add-cart");

const orderBtn =
    document.getElementById("order-btn");

const claimOfferBtn =
    document.getElementById("claim-offer-btn");


// ============================
// ADD TO CART FUNCTION
// ============================

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // SELECT FOOD CARD

        const foodCard =
            button.parentElement;

        // GET FOOD NAME

        const foodName =
            foodCard.querySelector("h3").innerText;

        // GET FOOD PRICE

        const foodPrice =
            foodCard.querySelector(".price").innerText;

        // STORE ITEM

        cartItems.push({
            name: foodName,
            price: foodPrice
        });

        // UPDATE CART COUNT

        cartCount++;

        cartBtn.innerText =
            `Cart (${cartCount})`;

        // SUCCESS MESSAGE

        alert(`${foodName} added to cart successfully!`);

    });

});


// ============================
// OPEN CART FUNCTION
// ============================

cartBtn.addEventListener("click", () => {

    // EMPTY CART CHECK

    if (cartItems.length === 0) {

        alert("🛒 Your cart is empty!");

        return;
    }

    // SHOW CART ITEMS

    let cartMessage =
        "🛒 Your Cart Items:\n\n";

    let totalPrice = 0;

    cartItems.forEach((item, index) => {

        cartMessage +=
            `${index + 1}. ${item.name} - ${item.price}\n`;

        // PRICE CALCULATION

        totalPrice += parseInt(
            item.price.replace("₹", "")
        );

    });

    // ADD TOTAL

    cartMessage +=
        `\n------------------------\n`;

    cartMessage +=
        `Total Amount: ₹${totalPrice}`;

    // DISPLAY CART

    alert(cartMessage);

});


// ============================
// ORDER BUTTON
// ============================

orderBtn.addEventListener("click", () => {

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ============================
// CLAIM OFFER BUTTON
// ============================

claimOfferBtn.addEventListener("click", () => {

    alert(
        "🎉 Congratulations!\n\nCoupon Code FOOD50 Applied Successfully!"
    );

});


// ============================
// NAVBAR ACTIVE EFFECT
// ============================

const navLinks =
    document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((nav) => {

            nav.style.color = "white";

        });

        link.style.color = "#ffe0d5";

    });

});


// ============================
// PAGE LOAD MESSAGE
// ============================

window.addEventListener("load", () => {

    console.log(
        "FoodExpress Website Loaded Successfully 🚀"
    );

});