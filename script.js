// Menu Data
const menuItems = [
  {
    id: 1,
    name: "Classic Pancakes",
    price: 8.99,
    category: "breakfast",
    type: "veg",
    tags: ["veg", "popular"],
    description: "Fluffy pancakes served with maple syrup and butter",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Avocado Toast",
    price: 12.99,
    category: "breakfast",
    type: "veg",
    tags: ["veg", "new"],
    description: "Fresh avocado on artisan bread with cherry tomatoes",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Chicken Sandwich",
    price: 14.99,
    category: "meals",
    type: "non-veg",
    tags: ["non-veg", "popular"],
    description: "Grilled chicken breast with lettuce and mayo",
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Caesar Salad",
    price: 11.99,
    category: "meals",
    type: "veg",
    tags: ["veg"],
    description: "Fresh romaine lettuce with caesar dressing and croutons",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Chocolate Chip Cookies",
    price: 4.99,
    category: "snacks",
    type: "veg",
    tags: ["veg", "popular"],
    description: "Freshly baked cookies with chocolate chips",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Fresh Orange Juice",
    price: 5.99,
    category: "drinks",
    type: "veg",
    tags: ["veg", "new"],
    description: "Freshly squeezed orange juice",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    name: "Chocolate Cake",
    price: 7.99,
    category: "desserts",
    type: "veg",
    tags: ["veg", "popular"],
    description: "Rich chocolate cake with chocolate frosting",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    name: "Fish Tacos",
    price: 16.99,
    category: "meals",
    type: "non-veg",
    tags: ["non-veg", "new"],
    description: "Grilled fish with cabbage slaw in soft tortillas",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Cart functionality
let cart = []
let currentFilter = "all"
let currentCategory = "all"

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menuItems)
  updateCartCount()
})

// Display menu items
function displayMenuItems(items) {
  const menuGrid = document.getElementById("menuGrid")
  menuGrid.innerHTML = ""

  items.forEach((item) => {
    const menuItemElement = createMenuItemElement(item)
    menuGrid.appendChild(menuItemElement)
  })
}

// Create menu item element
function createMenuItemElement(item) {
  const menuItem = document.createElement("div")
  menuItem.className = "menu-item fade-in-up"

  const stars = "★".repeat(Math.floor(item.rating)) + "☆".repeat(5 - Math.floor(item.rating))
  const tags = item.tags.map((tag) => `<span class="tag ${tag}">${tag}</span>`).join("")

  menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <div class="menu-item-price">$${item.price}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">(${item.rating})</span>
            </div>
            <div class="menu-item-tags">${tags}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                Add to Cart
            </button>
        </div>
    `

  return menuItem
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find((item) => item.id === itemId)
  const existingItem = cart.find((cartItem) => cartItem.id === itemId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  updateCartCount()
  updateCartDisplay()

  // Add visual feedback
  const button = event.target
  button.style.background = "var(--secondary-color)"
  button.textContent = "Added!"
  setTimeout(() => {
    button.style.background = "var(--primary-color)"
    button.textContent = "Add to Cart"
  }, 1000)
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
}

// Toggle cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar")
  cartSidebar.classList.toggle("open")
  updateCartDisplay()
}

// Update cart display
function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>'
    cartTotal.textContent = "0.00"
    return
  }

  cartItems.innerHTML = ""
  let total = 0

  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"

    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `

    cartItems.appendChild(cartItem)
    total += item.price * item.quantity
  })

  cartTotal.textContent = total.toFixed(2)
}

// Update item quantity
function updateQuantity(itemId, change) {
  const item = cart.find((cartItem) => cartItem.id === itemId)

  if (item) {
    item.quantity += change

    if (item.quantity <= 0) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId)
    }

    updateCartCount()
    updateCartDisplay()
  }
}

// Filter menu by type
function filterByType(type) {
  currentFilter = type

  // Update active button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  applyFilters()
}

// Filter menu by category
function filterMenu(category) {
  currentCategory = category
  applyFilters()
}

// Apply all filters
function applyFilters() {
  let filteredItems = menuItems

  // Filter by type
  if (currentFilter !== "all") {
    filteredItems = filteredItems.filter((item) => {
      if (currentFilter === "popular" || currentFilter === "new") {
        return item.tags.includes(currentFilter)
      }
      return item.type === currentFilter
    })
  }

  // Filter by category
  if (currentCategory !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === currentCategory)
  }

  displayMenuItems(filteredItems)
}

// Search menu
function searchMenu(query) {
  if (!query) {
    query = document.getElementById("searchInput").value
  }

  const searchTerm = query.toLowerCase()
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm),
  )

  displayMenuItems(filteredItems)
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  alert("Redirecting to payment...")
  simulateOrderProgress()
  cart = []
  updateCartCount()
  updateCartDisplay()
  toggleCart()
}

// Simulate order progress
function simulateOrderProgress() {
  const progressFill = document.getElementById("progressFill")
  const steps = document.querySelectorAll(".step")

  // Reset progress
  progressFill.style.width = "33%"
  steps.forEach((step, index) => {
    step.classList.remove("active")
    if (index === 0) step.classList.add("active")
  })

  // Simulate progress
  setTimeout(() => {
    progressFill.style.width = "66%"
    steps[1].classList.add("active")
  }, 2000)

  setTimeout(() => {
    progressFill.style.width = "100%"
    steps[2].classList.add("active")
  }, 4000)
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Close cart when clicking outside
document.addEventListener("click", (event) => {
  const cartSidebar = document.getElementById("cartSidebar")
  const cartIcon = document.querySelector(".cart-icon")

  if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
    cartSidebar.classList.remove("open")
  }
})
