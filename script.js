let products = [];

let cart = [];


// Load products from backend

async function loadProducts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        products = await response.json();

        displayProducts();

    } catch (error) {

        console.error(
            "Failed to load products:",
            error
        );

    }
}


// Display Products

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.name}
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart('${product._id}')">

                    Add to Cart

                </button>

            </div>
        `;

        container.appendChild(card);

    });
}


// Add to Cart

function addToCart(productId) {

    const product =
        products.find(
            item => item._id === productId
        );

    if (!product) {
        return;
    }

    cart.push(product);

    updateCart();

    alert(
        `${product.name} added to cart`
    );
}


// Update Cart

function updateCart() {

    const container =
        document.getElementById("cartContainer");

    const count =
        document.getElementById("cartCount");

    const total =
        document.getElementById("cartTotal");

    count.textContent = cart.length;

    container.innerHTML = "";

    let cartTotal = 0;


    cart.forEach((product, index) => {

        cartTotal += product.price;

        const item =
            document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <span>
                ${product.name}
            </span>

            <span>
                ₹${product.price}
            </span>

            <button
                onclick="removeFromCart(${index})">

                Remove

            </button>
        `;

        container.appendChild(item);

    });


    total.textContent = cartTotal;
}


// Remove from Cart

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// Checkout

document.getElementById(
    "checkoutBtn"
).addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }

        alert(
            "Checkout functionality will be connected to the backend."
        );

    }
);


// Login

document.getElementById(
    "loginForm"
).addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const email =
            document.getElementById(
                "loginEmail"
            ).value;

        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                alert(
                    "Login successful!"
                );

            } else {

                alert(
                    data.message ||
                    "Login failed"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to server."
            );

        }

    }
);


// Start

loadProducts();
