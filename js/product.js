console.log("product.js اجرا شد");
//                 اطلاعات محصولات
const productsData = {
    1: {
        name: "ست ساتن زرشکی",
        price: "2,490,000",
        image: "img/red.jpg",
        description: "ست ساتن با پارچه لطیف و باکیفیت."
    },
    2: {
        name: "ست نخی سرمه‌ای",
        price: "1,690,000",
        image: "img/dark.blue.jpg",
        description: "ست نخی راحت و سبک."
    },
    3: {
        name: "ست مخمل آبی",
        price: "2,290,000",
        image: "img/blue.jpg",
        description: "ست مخمل با لطافت فوق‌العاده."
    },
    4: {
        name: "ست حریر صورتی",
        price: "2,890,000",
        image: "img/pink.jpg",
        description: "ست حریر سبک و لطیف."
    },
    5: {
        name: "ست ساتن مشکی",
        price: "2,490,000",
        image: "img/nn.jpg",
        description: "ست ساتن مشکی با طراحی کلاسیک."
    },
    6: {
        name: "ست ساتن سبز",
        price: "2,490,000",
        image: "img/green.jpg",
        description: "ست ساتن با رنگ سبز خاص."
    }
};
//              گرفتن ID از آدرس صفحه
const params =
    new URLSearchParams(window.location.search);
const productId =
    params.get("id");
//                 پیدا کردن محصول
const product =
    productsData[productId];
//              اگر محصول وجود نداشت
if (!product) {
    console.error("محصول پیدا نشد!");
    document.getElementById("product-name").textContent =
        "محصول پیدا نشد";
    document.getElementById("product-description").textContent =
        "این محصول وجود ندارد.";
}
//              نمایش اطلاعات محصول
else {
    // نام
    document.getElementById("product-name").textContent =
        product.name;
    // نام در breadcrumb
    document.getElementById("breadcrumb-name").textContent =
        product.name;
    // قیمت
    document.getElementById("product-price").textContent =
        product.price;
    // عکس
    const productImage =
        document.getElementById("product-image");
    productImage.src =
        product.image;
    productImage.alt =
        product.name;
    // توضیحات
    document.getElementById("product-description").textContent =
        product.description;
    // شناسه محصول
    document.getElementById("product-id").textContent =
        productId;
}
//                    تعداد
let quantity = 1;
const quantityElement =
    document.getElementById("quantity");
const plusButton =
    document.getElementById("plus");
const minusButton =
    document.getElementById("minus");
//                    +
plusButton.addEventListener("click", function () {
    quantity++;
    quantityElement.textContent =
        quantity;
});
//                    -
minusButton.addEventListener("click", function () {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent =
            quantity;
    }
});
//                 رنگ محصول
const colorButtons =
    document.querySelectorAll(".color");
let selectedColor = "اصلی";
colorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        colorButtons.forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
        selectedColor =
            this.dataset.color;
    });
});
//               افزودن به سبد خرید
const addToCartButton =
    document.getElementById("add-to-cart");
addToCartButton.addEventListener("click", function () {
    // اگر محصول پیدا نشده
    if (!product) {
        return;
    }
    // گرفتن سبد قبلی
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    // پیدا کردن محصول قبلی
    const existingProduct =
        cart.find(function (item) {
            return item.id === String(productId);
        });
    // اگر محصول قبلاً در سبد بود
    if (existingProduct) {
        existingProduct.quantity =
            Number(existingProduct.quantity) + quantity;
    }
    // اگر محصول جدید بود
    else {
        cart.push({
            id: String(productId),
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            color: selectedColor
        });
    }
    // ذخیره در localStorage
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    // تغییر متن دکمه
    addToCartButton.innerHTML =
        '<i class="fa-solid fa-check"></i> اضافه شد';
    // بعد از کمی مکث رفتن به سبد
    setTimeout(function () {
        window.location.href =
            "cart.html";
    }, 500);
});
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cart.forEach(function(product) {
        count += Number(product.quantity) || 0;
    });
    cartCount.textContent = count;
}
updateCartCount();