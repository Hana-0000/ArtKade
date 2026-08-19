console.log("جاوااسکریپت صفحه خانه اجرا شد");
//                    CART COUNT
function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    // اگر عنصر سبد خرید وجود نداشت
    if (!cartCount) {
        return;
    }
    let cart = [];
    // خواندن سبد خرید از LocalStorage
    try {
        cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    } catch (error) {
        console.error(
            "خطا در خواندن سبد خرید:",
            error
        );
        cart = [];
    }
    // محاسبه تعداد محصولات
    let count = 0;
    cart.forEach(function (item) {
        count += Number(item.quantity) || 0;
    });
    // نمایش تعداد در منو
    cartCount.textContent = count;
}
//                       START
window.addEventListener("load", function () {
    updateCartCount();
});