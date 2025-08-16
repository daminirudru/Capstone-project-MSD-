// Form validation and handling
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleLogin()
  })

  // Register form submission
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleRegister()
  })
})

// Handle login
function handleLogin() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const rememberMe = document.getElementById("rememberMe").checked

  // Basic validation
  if (!validateEmail(email)) {
    showError("Please enter a valid email address")
    return
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters long")
    return
  }

  // Show loading state
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.classList.add("loading")

  // Simulate API call
  setTimeout(() => {
    loginBtn.classList.remove("loading")

    // Store user session (in real app, this would be handled by backend)
    const userData = {
      email: email,
      name: "John Doe", // This would come from backend
      loginTime: new Date().toISOString(),
    }

    if (rememberMe) {
      localStorage.setItem("userData", JSON.stringify(userData))
    } else {
      sessionStorage.setItem("userData", JSON.stringify(userData))
    }

    showSuccess("Login successful! Redirecting...")

    // Redirect to main page
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  }, 2000)
}

// Handle registration
function handleRegister() {
  const fullName = document.getElementById("fullName").value
  const email = document.getElementById("regEmail").value
  const password = document.getElementById("regPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const agreeTerms = document.getElementById("agreeTerms").checked

  // Validation
  if (fullName.trim().length < 2) {
    showError("Please enter your full name")
    return
  }

  if (!validateEmail(email)) {
    showError("Please enter a valid email address")
    return
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters long")
    return
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match")
    return
  }

  if (!agreeTerms) {
    showError("Please agree to the Terms & Conditions")
    return
  }

  // Show loading state
  const registerBtn = document.querySelector("#registerCard .login-btn")
  registerBtn.classList.add("loading")

  // Simulate API call
  setTimeout(() => {
    registerBtn.classList.remove("loading")

    showSuccess("Account created successfully! Please sign in.")

    // Switch to login form
    setTimeout(() => {
      showLogin()
    }, 1500)
  }, 2000)
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const toggleIcon = document.getElementById("toggleIcon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleIcon.classList.remove("fa-eye")
    toggleIcon.classList.add("fa-eye-slash")
  } else {
    passwordInput.type = "password"
    toggleIcon.classList.remove("fa-eye-slash")
    toggleIcon.classList.add("fa-eye")
  }
}

// Toggle register password visibility
function toggleRegisterPassword() {
  const passwordInput = document.getElementById("regPassword")
  const toggleIcon = document.getElementById("regToggleIcon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleIcon.classList.remove("fa-eye")
    toggleIcon.classList.add("fa-eye-slash")
  } else {
    passwordInput.type = "password"
    toggleIcon.classList.remove("fa-eye-slash")
    toggleIcon.classList.add("fa-eye")
  }
}

// Show registration form
function showRegister() {
  const loginCard = document.querySelector(".login-card")
  const registerCard = document.getElementById("registerCard")

  loginCard.style.display = "none"
  registerCard.style.display = "block"
  registerCard.classList.add("card-slide-in")
}

// Show login form
function showLogin() {
  const loginCard = document.querySelector(".login-card")
  const registerCard = document.getElementById("registerCard")

  registerCard.style.display = "none"
  loginCard.style.display = "block"
  loginCard.classList.add("card-slide-in")
}

// Social login
function socialLogin(provider) {
  showInfo(`Redirecting to ${provider} login...`)

  // In a real app, this would redirect to OAuth provider
  setTimeout(() => {
    const userData = {
      email: `user@${provider}.com`,
      name: `${provider} User`,
      loginTime: new Date().toISOString(),
      provider: provider,
    }

    sessionStorage.setItem("userData", JSON.stringify(userData))
    showSuccess(`${provider} login successful! Redirecting...`)

    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  }, 2000)
}

// Utility functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showError(message) {
  showNotification(message, "error")
}

function showSuccess(message) {
  showNotification(message, "success")
}

function showInfo(message) {
  showNotification(message, "info")
}

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `

  // Style notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `

  document.body.appendChild(notification)

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }, 4000)
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle"
    case "error":
      return "fa-exclamation-circle"
    case "info":
      return "fa-info-circle"
    default:
      return "fa-info-circle"
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#43A047"
    case "error":
      return "#f44336"
    case "info":
      return "#2196F3"
    default:
      return "#2196F3"
  }
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Check if user is already logged in
function checkUserSession() {
  const userData = localStorage.getItem("userData") || sessionStorage.getItem("userData")
  if (userData) {
    // User is already logged in, could redirect or show different UI
    console.log("User already logged in:", JSON.parse(userData))
  }
}

// Initialize
checkUserSession()
