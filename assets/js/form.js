// Form data storage
let formData = {};
let uploadedFile = null;

// Navigation and stepper functionality
let currentStep = 1;
const totalSteps = 3;

function updateStepper() {
  // Update header progress
  const header = document.querySelector(".bs-stepper-header");
  header.className = `bs-stepper-header step-${currentStep}`;

  // Update step states
  document.querySelectorAll(".step").forEach((step, index) => {
    const stepNumber = index + 1;
    step.classList.remove("active", "completed");

    if (stepNumber < currentStep) {
      step.classList.add("completed");
    } else if (stepNumber === currentStep) {
      step.classList.add("active");
    }
  });

  // Show/hide content
  document.querySelectorAll(".step-content").forEach((content, index) => {
    const stepNumber = index + 1;
    if (stepNumber === currentStep) {
      content.classList.add("active");
      content.style.display = "block";
    } else {
      content.classList.remove("active");
      content.style.display = "none";
    }
  });
}

// Real-time validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  // Nigerian phone number validation (10-15 digits)
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

function validateField(input) {
  const errorElement = document.getElementById(`${input.name}-error`);
  let isValid = true;
  let errorMessage = "";

  // Remove previous error state
  input.classList.remove("error");
  if (errorElement) errorElement.classList.remove("show");

  // Check if field is empty (for required fields)
  if (input.hasAttribute("required") || input.value.trim() !== "") {
    if (!input.value.trim() && input.hasAttribute("required")) {
      isValid = false;
      errorMessage = `Please enter your ${input.name
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()}`;
    } else if (input.value.trim() !== "") {
      // Field-specific validation
      switch (input.name) {
        case "email":
          if (!validateEmail(input.value)) {
            isValid = false;
            errorMessage = "Please enter a valid email address";
          }
          break;

        case "phone":
          if (!validatePhone(input.value)) {
            isValid = false;
            errorMessage = "Please enter a valid phone number (10-15 digits)";
          }
          break;

        case "fullName":
          if (input.value.trim().length < 2) {
            isValid = false;
            errorMessage = "Full name must be at least 2 characters";
          }
          break;

        case "tagName":
          if (input.value.trim().length < 3) {
            isValid = false;
            errorMessage = "Tag name must be at least 3 characters";
          }
          break;

        case "companyName":
          if (input.value.trim().length < 2) {
            isValid = false;
            errorMessage = "Company name must be at least 2 characters";
          }
          break;

        case "companyAddress":
          if (input.value.trim().length < 10) {
            isValid = false;
            errorMessage = "Please enter a complete address";
          }
          break;

        case "yearsInBusiness":
        case "numberOfEmployees":
          const num = parseInt(input.value);
          if (isNaN(num) || num < 0) {
            isValid = false;
            errorMessage = "Please enter a valid positive number";
          }
          break;

        case "objectives":
        case "challenges":
          if (input.value.trim().length < 10) {
            isValid = false;
            errorMessage =
              "Please provide more details (minimum 10 characters)";
          }
          break;
      }
    }
  }

  // Show error if validation failed
  if (!isValid) {
    input.classList.add("error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
    }
  }

  return isValid;
}

function validateStep(step) {
  const stepElement = document.getElementById(`step-${step}`);
  const inputs = stepElement.querySelectorAll(
    'input[required], select[required], input:not([type="file"]), select:not([multiple])'
  );
  let isValid = true;

  inputs.forEach((input) => {
    const fieldValid = validateField(input);
    if (!fieldValid) {
      isValid = false;
    }
  });

  return isValid;
}

function saveStepData(step) {
  const stepElement = document.getElementById(`step-${step}`);
  const inputs = stepElement.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    if (input.type !== "file") {
      formData[input.name] = input.value;
    }
  });
}

// Real-time validation event listeners
function setupRealTimeValidation() {
  // Get all form inputs
  const allInputs = document.querySelectorAll(
    'input:not([type="file"]), select, textarea'
  );

  allInputs.forEach((input) => {
    // Validate on blur (when user leaves the field)
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "" || input.hasAttribute("required")) {
        validateField(input);
      }
    });

    // Validate on input for specific fields (real-time feedback)
    if (["email", "phone"].includes(input.name)) {
      input.addEventListener("input", () => {
        // Debounce validation for better performance
        clearTimeout(input.validationTimeout);
        input.validationTimeout = setTimeout(() => {
          if (input.value.trim() !== "") {
            validateField(input);
          } else {
            // Clear error if field is empty
            input.classList.remove("error");
            const errorElement = document.getElementById(`${input.name}-error`);
            if (errorElement) errorElement.classList.remove("show");
          }
        }, 500);
      });
    }

    // Clear error state when user starts typing
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        input.classList.remove("error");
        const errorElement = document.getElementById(`${input.name}-error`);
        if (errorElement) errorElement.classList.remove("show");
      }
    });

    // Handle select dropdowns
    if (input.tagName === "SELECT") {
      input.addEventListener("change", () => {
        validateField(input);
      });
    }
  });
}

// File upload functionality
const fileUploadArea = document.getElementById("fileUploadArea");
const fileInput = document.getElementById("cvFile");
const uploadPrompt = document.getElementById("uploadPrompt");
const uploadedFileContainer = document.getElementById("uploadedFileContainer");
const uploadedFileName = document.getElementById("uploadedFileName");
const removeFileBtn = document.getElementById("removeFileBtn");
const jumpToStep1Btn = document.getElementById("jumpToStep1");
const jumpToStep2Btn = document.getElementById("jumpToStep2");
const jumpToStep3Btn = document.getElementById("jumpToStep3");

// File upload event listeners
if (fileUploadArea) {
  fileUploadArea.addEventListener("click", (e) => {
    // Prevent the click if it's coming from the file input itself
    if (e.target === fileInput) {
      return;
    }

    if (!uploadedFile) {
      e.preventDefault();
      e.stopPropagation();
      fileInput.click();
    }
  });

  fileUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadArea.classList.add("dragover");
  });

  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.classList.remove("dragover");
  });

  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileUploadArea.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });
}

if (fileInput) {
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  });
}

if (removeFileBtn) {
  removeFileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeFile();
  });
}

function handleFileUpload(file) {
  // Validate file type
  const allowedTypes = [".pdf", ".doc", ".docx"];
  const fileExtension = "." + file.name.split(".").pop().toLowerCase();

  if (!allowedTypes.includes(fileExtension)) {
    showFileError("Please upload a PDF, DOC, or DOCX file.");
    return;
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    showFileError("File size should not exceed 10MB.");
    return;
  }

  uploadedFile = file;
  uploadedFileName.textContent = file.name;
  uploadPrompt.style.display = "none";
  uploadedFileContainer.style.display = "block";
  fileUploadArea.style.padding = "0";

  // Clear any previous file errors
  clearFileError();
}

function removeFile() {
  uploadedFile = null;
  fileInput.value = "";
  uploadPrompt.style.display = "block";
  uploadedFileContainer.style.display = "none";
  fileUploadArea.style.padding = "24px";
  clearFileError();
}

function showFileError(message) {
  // Create or update file error message
  let fileError = document.getElementById("file-error");
  if (!fileError) {
    fileError = document.createElement("div");
    fileError.id = "file-error";
    fileError.className = "error-message show";
    fileError.style.marginTop = "8px";
    fileUploadArea.parentNode.appendChild(fileError);
  }
  fileError.textContent = message;
  fileError.classList.add("show");
}

function clearFileError() {
  const fileError = document.getElementById("file-error");
  if (fileError) {
    fileError.classList.remove("show");
  }
}

// jump to step

jumpToStep1Btn.addEventListener("click", () => {
  currentStep = 1;
  updateStepper();
});

jumpToStep2Btn.addEventListener("click", () => {
  currentStep = 2;
  updateStepper();
});

jumpToStep3Btn.addEventListener("click", () => {
  currentStep = 3;
  updateStepper();
});

// Step navigation
document.getElementById("step1Next").addEventListener("click", () => {
  if (validateStep(1)) {
    saveStepData(1);
    currentStep = 2;
    updateStepper();
  }
});

document.getElementById("step2Back").addEventListener("click", () => {
  currentStep = 1;
  updateStepper();
});

document.getElementById("step2Next").addEventListener("click", () => {
  if (validateStep(2)) {
    saveStepData(2);
    currentStep = 3;
    updateStepper();
  }
});

document.getElementById("step3Next").addEventListener("click", () => {
  saveStepData(3);
  currentStep = 4;
  updateStepper();

  Object.keys(formData).forEach((key) => {
    const fieldElement = document.getElementById(`${key}-answer`);
    if (fieldElement) {
      fieldElement.textContent = formData[key] || "N/A";
    }
  });

  const fileUploadAreaElement = document.getElementById(
    "fileUploadArea-answer"
  );

  if (uploadedFile && fileUploadAreaElement) {
    fileUploadAreaElement.textContent = uploadedFile.name;
  }
});

document.getElementById("step3Back").addEventListener("click", () => {
  currentStep = 2;
  updateStepper();
});

// Form submission
document.getElementById("multiStepForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateStep(3)) {
    saveStepData(3);

    // Add file to form data
    if (uploadedFile) {
      formData.cvFile = uploadedFile;
    }

    console.log("Form Data:", formData);
    console.log("Uploaded File:", uploadedFile);

    // Here you would typically send the data to your server
    // Example:
    // submitFormData(formData, uploadedFile);

    // Show success message
    document.querySelectorAll(".step-content").forEach((content) => {
      content.style.display = "none";
    });
    document.getElementById("success-step").style.display = "block";
  }
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize stepper
  updateStepper();

  // Setup real-time validation
  setupRealTimeValidation();

  // Set current year
  const currentYearElement = document.getElementById("currentYear");
  const currentYearFooterElement = document.getElementById("currentYearFooter");

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  if (currentYearFooterElement) {
    currentYearFooterElement.textContent = new Date().getFullYear();
  }
});

// Optional: Function to submit form data to server
function submitFormData(formData, file) {
  const submitData = new FormData();

  // Add all form fields
  Object.keys(formData).forEach((key) => {
    if (key !== "cvFile") {
      submitData.append(key, formData[key]);
    }
  });

  // Add file if present
  if (file) {
    submitData.append("cvFile", file);
  }
}
