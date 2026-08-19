console.log("جاوااسکریپت سبد خرید اجرا شد");


// =====================================================
//                    CART COUNT
// =====================================================

function updateCartCount() {

    const cartCount =
        document.querySelector("#cart-count");

    if (!cartCount) return;

    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

    } catch (error) {

        console.error(
            "خطا در خواندن سبد خرید:",
            error
        );

        cart = [];
    }


    let count = 0;


    cart.forEach(function (item) {

        count +=
            Number(item.quantity) || 0;

    });


    cartCount.textContent = count;
}



// =====================================================
//                 CART ELEMENTS
// =====================================================

const cartContainer =
    document.getElementById("cart-container");

const cartTotal =
    document.getElementById("cart-total");

const emptyCart =
    document.getElementById("empty-cart");

const paymentSection =
    document.getElementById("payment-section");



// =====================================================
//                    GET CART
// =====================================================

let cart = [];

try {

    cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    // مطمئن شویم cart حتماً آرایه است
    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    console.error(
        "خطا در خواندن سبد خرید:",
        error
    );

    cart = [];
}



// =====================================================
//                    SHOW CART
// =====================================================

function showCart() {

    if (!cartContainer) return;


    // پاک کردن محصولات قبلی
    cartContainer.innerHTML = "";


    let total = 0;


    // =================================================
    //                    EMPTY CART
    // =================================================

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (paymentSection) {
            paymentSection.style.display = "none";
        }

        if (cartTotal) {
            cartTotal.innerHTML = "";
        }

        updateCartCount();

        return;
    }



    // =================================================
    //                 CART HAS PRODUCTS
    // =================================================

    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    if (paymentSection) {
        paymentSection.style.display = "block";
    }



    // =================================================
    //                 CREATE PRODUCTS
    // =================================================

    cart.forEach(function (product, index) {


        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        const priceNumber =
            Number(
                String(product.price ?? "")
                    .replace(/,/g, "")
                    .replace(/٬/g, "")
                    .replace(/تومان/g, "")
                    .trim()
            ) || 0;



        // ---------------------------------------------
        // QUANTITY
        // ---------------------------------------------

        let quantity =
            Number(product.quantity);

        if (!Number.isFinite(quantity) || quantity < 1) {

            quantity = 1;

            product.quantity = 1;
        }



        // ---------------------------------------------
        // TOTAL
        // ---------------------------------------------

        total +=
            priceNumber * quantity;



        // ---------------------------------------------
        // PRODUCT CARD
        // ---------------------------------------------

        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        item.innerHTML = `

            <a
                href="product.html?id=${product.id}"
                class="cart-product-image"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </a>


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${priceNumber.toLocaleString("fa-IR")}
                    تومان
                </p>

            </div>


            <div class="quantity">

                <button
                    type="button"
                    onclick="changeQuantity(${index}, 1)"
                    aria-label="افزایش تعداد"
                >
                    +
                </button>


                <span>
                    ${quantity}
                </span>


                <button
                    type="button"
                    onclick="changeQuantity(${index}, -1)"
                    aria-label="کاهش تعداد"
                >
                    −
                </button>

            </div>


            <button
                type="button"
                class="remove-item"
                onclick="removeProduct(${index})"
                aria-label="حذف محصول"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartContainer.appendChild(item);

    });



    // =================================================
    //               SAVE NORMALIZED CART
    // =================================================

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    // =================================================
    //                 CART COUNT
    // =================================================

    updateCartCount();



    // =================================================
    //                 TOTAL PRICE
    // =================================================

    if (cartTotal) {

        cartTotal.innerHTML = `

            <div class="total-box">

                <span>
                    جمع کل:
                </span>

                <strong>
                    ${total.toLocaleString("fa-IR")}
                    تومان
                </strong>

            </div>

        `;

    }

}



// =====================================================
//                 CHANGE QUANTITY
// =====================================================

function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }


    // تبدیل quantity به عدد معتبر
    let quantity =
        Number(cart[index].quantity) || 1;


    quantity += amount;



    // اگر تعداد صفر یا کمتر شد
    // محصول حذف شود

    if (quantity <= 0) {

        cart.splice(index, 1);

    } else {

        cart[index].quantity =
            quantity;

    }



    // ذخیره سبد خرید

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    // نمایش دوباره سبد

    showCart();

}



// =====================================================
//                  REMOVE PRODUCT
// =====================================================

function removeProduct(index) {

    if (!cart[index]) {
        return;
    }


    // حذف محصول

    cart.splice(index, 1);



    // ذخیره

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    // نمایش دوباره

    showCart();

}



// =====================================================
//                       START
// =====================================================

window.addEventListener(
    "load",
    function () {

        showCart();

        updateCartCount();

    }
);