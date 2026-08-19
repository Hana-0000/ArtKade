//                 دریافت سبد خرید
let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];
//                 تعداد سبد خرید
function updatePaymentCartCount() {
    const cartCount =
        document.getElementById("cart-count");
    if (!cartCount) return;
    let count = 0;
    cart.forEach(function(product) {
        count +=
            Number(product.quantity) || 0;
    });
    cartCount.textContent = count;
}
//                 تبدیل قیمت به عدد
function priceToNumber(price) {
    return Number(
        String(price)
            .replace(/,/g, "")
            .replace(/٬/g, "")
            .replace(/تومان/g, "")
            .trim()
    ) || 0;
}
//                 نمایش محصولات سفارش
function showPaymentProducts() {
    const container =
        document.getElementById("payment-products");
    if (!container) return;
    container.innerHTML = "";
    // اگر سبد خالی باشد
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="payment-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>
                    سبد خرید شما خالی است.
                </p>
                <a href="shop.html">
                    بازگشت به فروشگاه
                </a>
            </div>
        `;
        return;
    }
    // نمایش محصولات
    cart.forEach(function(product) {
        const quantity =
            Number(product.quantity) || 1;
        const price =
            priceToNumber(product.price);
        const total =
            price * quantity;
        const item =
            document.createElement("div");
        item.className =
            "payment-product";
        item.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >
            <div class="payment-product-info">
                <h3>
                    ${product.name}
                </h3>
                <p>
                    تعداد: ${quantity}
                </p>
            </div>
            <div class="payment-product-total">
                ${total.toLocaleString("fa-IR")}
                تومان
            </div>
        `;
        container.appendChild(item);
    });
    updatePaymentTotal();
}
//                 محاسبه مبلغ سفارش
function updatePaymentTotal() {
    let subtotal = 0;
    cart.forEach(function(product) {
        const price =
            priceToNumber(product.price);
        const quantity =
            Number(product.quantity) || 1;
        subtotal +=
            price * quantity;
    });
    // هزینه ارسال
    const shipping =
        Number(
            document.querySelector(
                'input[name="shipping"]:checked'
            )?.value
        ) || 0;
    // مبلغ نهایی
    const final =
        subtotal + shipping;
    // جمع محصولات
    const subtotalElement =
        document.getElementById("subtotal");
    if (subtotalElement) {
        subtotalElement.textContent =
            subtotal.toLocaleString("fa-IR")
            + " تومان";
    }
    // هزینه ارسال
    const shippingElement =
        document.getElementById("shipping-total");
    if (shippingElement) {
        shippingElement.textContent =
            shipping === 0
                ? "رایگان"
                : shipping.toLocaleString("fa-IR")
                  + " تومان";
    }
    // مبلغ نهایی
    const finalElement =
        document.getElementById("final-total");
    if (finalElement) {
        finalElement.textContent =
            final.toLocaleString("fa-IR")
            + " تومان";
    }
}
//                 تغییر روش ارسال
document.querySelectorAll(
    'input[name="shipping"]'
).forEach(function(radio) {
    radio.addEventListener(
        "change",
        updatePaymentTotal
    );
});
//                    پرداخت
const paymentButton =
    document.getElementById("payment-button");
if (paymentButton) {
    paymentButton.addEventListener(
        "click",
        function() {
            const form =
                document.getElementById(
                    "payment-form"
                );
            // بررسی فرم
            if (!form.checkValidity()) {
    form.reportValidity();
    return;
}

// بررسی شماره موبایل
const phoneInput =
    document.getElementById("phone");

if (phoneInput) {

    const phone =
        phoneInput.value.trim();

    if (phone.length !== 11) {

        alert(
            "شماره موبایل باید دقیقاً ۱۱ رقم باشد."
        );

        phoneInput.focus();

        return;
    }

    // باید با 09 شروع شود
    if (!/^09[0-9]{9}$/.test(phone)) {

        alert(
            "شماره موبایل وارد شده معتبر نیست."
        );

        phoneInput.focus();

        return;
    }
}
            // بررسی سبد خرید
            if (cart.length === 0) {
                alert(
                    "سبد خرید شما خالی است."
                );
                return;
            }
            // فعلاً پرداخت واقعی نیست
            alert(
                "اطلاعات سفارش ثبت شد. آماده اتصال به درگاه پرداخت."
            );
        }
    );
}
//                    اجرای اولیه
updatePaymentCartCount();
showPaymentProducts();
//                 شماره موبایل

if (phoneInput) {
    // جلوگیری از وارد شدن بیشتر از 11 رقم
    phoneInput.addEventListener(
        "input",
        function () {
            // فقط عددهای فارسی و انگلیسی
            this.value =
                this.value.replace(
                    /[^0-9۰-۹]/g,
                    ""
                );
            // حداکثر 11 رقم
            if (this.value.length > 11) {
                this.value =
                    this.value.slice(0, 11);
            }
        }
    );

}