// Navbar toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cart functionality
const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");
const closeCartBtn = document.getElementById("close-cart");
const toast = document.getElementById("toast");

let cartItems = [];

// Toggle cart
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCartBtn.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const product = e.target.closest(".product");
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);

    const existing = cartItems.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cartItems.push({ id, name, price, qty: 1 });
    }
    renderCart();
    showToast(`${name} added to cart!`);
  });
});

// Render Cart
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cartItems.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <h4>${item.name}</h4>
      <div class="qty">
        <button onclick="changeQty('${item.id}', -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.id}', 1)">+</button>
      </div>
      <p>${item.price * item.qty}৳</p>
    `;
    cartItemsContainer.appendChild(div);
  });

  totalPriceEl.textContent = total;
  cartCountEl.textContent = count;
}

// Change qty
function changeQty(id, delta) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cartItems = cartItems.filter(i => i.id !== id);
  }
  renderCart();
}

// Toast message
function showToast(message) {
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}
