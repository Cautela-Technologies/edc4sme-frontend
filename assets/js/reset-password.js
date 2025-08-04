// Form elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");

// Error message elements
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(input, errorElement, message) {
  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.classList.remove("show");
}

// Real-time validation
emailInput.addEventListener("input", function () {
  const email = this.value.trim();
  if (email && !validateEmail(email)) {
    showError(emailInput, emailError, "Please enter a valid email address");
  } else {
    hideError(emailInput, emailError);
  }
});

// Form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  let isValid = true;

  // Reset previous errors
  hideError(emailInput, emailError);

  // Validate email
  if (!email) {
    showError(emailInput, emailError, "Email address is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, emailError, "Please enter a valid email address");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const resetPasswordData = {
    email: email,
  };

  console.log("reset attempt:", resetPasswordData);
  window.location.href = "/reset-successful";
});
