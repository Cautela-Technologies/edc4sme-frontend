// Form elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("rememberMe");
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

function toggleCheckbox() {
  rememberMeCheckbox.checked = !rememberMeCheckbox.checked;
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

passwordInput.addEventListener("input", function () {
  const password = this.value;
  if (password && !validatePassword(password)) {
    showError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters long"
    );
  } else {
    hideError(passwordInput, passwordError);
  }
});

// Form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let isValid = true;

  // Reset previous errors
  hideError(emailInput, emailError);
  hideError(passwordInput, passwordError);

  // Validate email
  if (!email) {
    showError(emailInput, emailError, "Email address is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, emailError, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!password) {
    showError(passwordInput, passwordError, "Password is required");
    isValid = false;
  } else if (!validatePassword(password)) {
    showError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters long"
    );
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const loginData = {
    email: email,
    password: password,
    rememberMe: rememberMeCheckbox.checked,
  };

  console.log("Login attempt:", loginData);
});
