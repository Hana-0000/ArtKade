console.log("جاوااسکریپت فروشگاه اجرا شد");
// CART COUNT
function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    if (!cartCount) return;
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        console.error("خطا در خواندن سبد خرید:", error);
        cart = [];
    }
    let count = 0;
    cart.forEach(function (item) {
        count += Number(item.quantity) || 0;
    });
    cartCount.textContent = count;
}
// SEARCH
const searchInput = document.querySelector("#searchInput");
const products = document.querySelectorAll(".shop-card");
const sectionTitle = document.querySelector(".section-title");
const notFound = document.querySelector("#notFound");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchText = this.value.trim().toLowerCase();
        let found = 0;
        products.forEach(function (product) {
            const productName = product.querySelector("h3")?.textContent.trim().toLowerCase() || "";
            if (productName.includes(searchText)) {
                product.style.display = "";
                found++;
            } else {
                product.style.display = "none";
            }
        });
        if (found === 0 && products.length > 0) {
            if (sectionTitle) {
                sectionTitle.style.display = "none";
            }
            if (notFound) {
                notFound.style.display = "block";
            }
        } else {
            if (sectionTitle) {
                sectionTitle.style.display = "";
            }
            if (notFound) {
                notFound.style.display = "none";
            }
        }
    });
}
// =====================================================
//                    ADD TO CART
// =====================================================

const buyButtons =
    document.querySelectorAll(".buy-btn");

buyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            this.closest(".shop-card");

        if (!card) {
            console.error("کارت محصول پیدا نشد!");
            return;
        }


        // اطلاعات محصول
        const productId =
            card.getAttribute("id");

        const name =
            card.querySelector("h3")?.textContent.trim();

        const price =
            card.querySelector(".price")?.textContent.trim();

        const image =
            card.querySelector("img")?.getAttribute("src");


        // بررسی اطلاعات
        if (!productId) {
            console.error(
                "برای کارت محصول ID تعریف نشده است!"
            );
            return;
        }

        if (!name) {
            console.error(
                "نام محصول پیدا نشد!"
            );
            return;
        }

        if (!price) {
            console.error(
                "قیمت محصول پیدا نشد!"
            );
            return;
        }

        if (!image) {
            console.error(
                "تصویر محصول پیدا نشد!"
            );
            return;
        }


        // دریافت سبد خرید
        let cart = [];

        try {

            const savedCart =
                localStorage.getItem("cart");

            if (savedCart) {
                cart = JSON.parse(savedCart);
            }

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


        // بررسی وجود محصول
        const existingProduct =
            cart.find(function (item) {

                return String(item.id) ===
                       String(productId);

            });


        // اگر محصول قبلاً وجود داشت
        if (existingProduct) {

            existingProduct.quantity =
                (Number(existingProduct.quantity) || 0) + 1;

        }

        // اگر محصول جدید بود
        else {

            cart.push({

                id: String(productId),

                name: name,

                price: price,

                image: image,

                quantity: 1

            });

        }


        // ذخیره سبد خرید
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        //  برای اطمینان
        console.log(
            "سبد خرید:",
            cart
        );


        // بروزرسانی تعداد سبد
        updateCartCount();


        // رفتن به صفحه سبد
        window.location.href =
            "cart.html";

    });

});
// START
window.addEventListener("load", function () {
    updateCartCount();
});