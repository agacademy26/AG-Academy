let cart = [];

// فتح وإغلاق النافذة
const cartModal = document.getElementById('cart-modal');
document.getElementById('open-cart-btn').onclick = () => cartModal.style.display = 'flex';
document.getElementById('close-cart-btn').onclick = () => cartModal.style.display = 'none';

// إضافة كورس للسلة
function addToCart(title, price, image) {
    // التأكد من عدم إضافة الكورس مرتين
    if (cart.some(item => item.title === title)) {
        alert('هذا الكورس موجود بالفعل في سلة الاشتراكات!');
        return;
    }
    cart.push({ title, price, image });
    updateCartUI();
    cartModal.style.display = 'flex';
}

// تحديث سلة الاشتراكات
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('total-amount');

    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.price} ج.م</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff0055; cursor:pointer;">❌</button>
            </div>
        `;
    });

    totalAmount.innerText = `${total} ج.م`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// تأكيد الاشتراك وإرسال البيانات عبر الواتساب
function processCheckout() {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;

    if (!name || !email || !phone) {
        alert('برجاء إدخال كافة البيانات (الاسم، البريد الإلكتروني، ورقم الواتساب)!');
        return;
    }

    if (cart.length === 0) {
        alert('لم تقم باختيار أي كورس بعد!');
        return;
    }

    let coursesList = cart.map(i => `- ${i.title} (${i.price} ج.م)`).join('%0A');
    let total = cart.reduce((sum, i) => sum + i.price, 0);

    let message = `*اشتراك جديد في كورسات Ziad Faisal Academy* 🎓%0A%0A` +
        `*الاسم:* ${name}%0A` +
        `*الإيميل:* ${email}%0A` +
        `*رقم التواصل:* ${phone}%0A` +
        `*طريقة الدفع:* فودافون كاش%0A%0A` +
        `*الكورسات المطلوبة:*%0A${coursesList}%0A%0A` +
        `*الإجمالي المفروض تحويله:* ${total} ج.م%0A%0A` +
        `*(مرفق إيصال التحويل لتأكيد الإرسال وتفعيل الكورس)*`;

    // ضع رقم الموبايل/الواتساب الخاص بك هنا لكي تصلك الطلبات عليه (مثلاً: 201012345678)
    const myNumber = "201000000000"; 
    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
}