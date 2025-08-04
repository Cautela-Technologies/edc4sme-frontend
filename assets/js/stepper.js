// // Initialize stepper with progress tracking
// let stepper = new Stepper(document.querySelector("#stepper"), {
//   linear: true,
//   animation: true,
// });

// let currentStep = 1;
// let uploadedFile = null;

// function updateStepperProgress() {
//   const header = document.querySelector(".bs-stepper-header");
//   header.className = "bs-stepper-header step-" + currentStep;

//   // Add 'completed' class to all previous steps
//   const steps = document.querySelectorAll(".bs-stepper-header .step");
//   steps.forEach((step, index) => {
//     if (index < currentStep - 1) {
//       step.classList.add("completed");
//     } else {
//       step.classList.remove("completed");
//     }
//   });
// }

// // Initialize progress
// updateStepperProgress();

// // Form validation functions
// function validateEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// function validatePhone(phone) {
//   const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
//   return phoneRegex.test(phone.replace(/\s/g, ""));
// }

// function showError(fieldId, show = true) {
//   const field = document.getElementById(fieldId);
//   const error = document.getElementById(fieldId + "-error");

//   if (show) {
//     field?.classList?.add("error");
//     error?.classList?.add("show");
//   } else {
//     field?.classList?.remove("error");
//     error?.classList?.remove("show");
//   }
// }

// function validateStep1() {
//   let isValid = true;

//   // Email validation
//   const email = document.getElementById("email").value.trim();
//   if (!email || !validateEmail(email)) {
//     showError("email", true);
//     isValid = false;
//   } else {
//     showError("email", false);
//   }

//   // Full name validation
//   const fullName = document.getElementById("fullName").value.trim();
//   if (!fullName || fullName.length < 2) {
//     showError("fullName", true);
//     isValid = false;
//   } else {
//     showError("fullName", false);
//   }

//   // Phone validation
//   const phone = document.getElementById("phone").value.trim();
//   if (!phone || !validatePhone(phone)) {
//     showError("phone", true);
//     isValid = false;
//   } else {
//     showError("phone", false);
//   }

//   // Nationality validation
//   const nationality = document.getElementById("nationality").value;
//   if (!nationality) {
//     showError("nationality", true);
//     isValid = false;
//   } else {
//     showError("nationality", false);
//   }

//   // Date of birth validation
//   const dob = document.getElementById("dob").value;
//   if (!dob) {
//     showError("dob", true);
//     isValid = false;
//   } else {
//     const dobDate = new Date(dob);
//     const today = new Date();
//     const age = today.getFullYear() - dobDate.getFullYear();
//     if (age < 16 || age > 120) {
//       showError("dob", true);
//       isValid = false;
//     } else {
//       showError("dob", false);
//     }
//   }

//   // Sex validation
//   const sex = document.getElementById("sex").value;
//   if (!sex) {
//     showError("sex", true);
//     isValid = false;
//   } else {
//     showError("sex", false);
//   }

//   // Tag name validation
//   const tagName = document.getElementById("tagName").value.trim();
//   if (!tagName) {
//     showError("tagName", true);
//     isValid = false;
//   } else {
//     showError("tagName", false);
//   }

//   return isValid;
// }

// function validateStep2() {
//   let isValid = true;

//   const fields = [
//     "companyName",
//     "companyAddress",
//     "jobTitle",
//     "businessStartDate",
//     "yearsInBusiness",
//     "numberOfEmployees",
//   ];

//   fields.forEach((fieldId) => {
//     const value = document.getElementById(fieldId).value.trim();
//     if (!value) {
//       showError(fieldId, true);
//       isValid = false;
//     } else {
//       showError(fieldId, false);
//     }
//   });

//   return isValid;
// }

// function validateStep3() {
//   let isValid = true;

//   // Learn validation
//   const learn = document.getElementById("learn").value;
//   if (!learn) {
//     showError("learn", true);
//     isValid = false;
//   } else {
//     showError("learn", false);
//   }

//   // Field of study validation
//   const objectives = document.getElementById("objectives").value.trim();
//   if (!objectives) {
//     showError("objectives", true);
//     isValid = false;
//   } else {
//     showError("objectives", false);
//   }

//   // Institution validation
//   const challenges = document.getElementById("challenges").value.trim();
//   if (!challenges) {
//     showError("challenges", true);
//     isValid = false;
//   } else {
//     showError("challenges", false);
//   }

//   return isValid;
// }

// // Step navigation
// document.getElementById("step1Next").addEventListener("click", function () {
//   if (validateStep1()) {
//     currentStep = 2;
//     updateStepperProgress();
//     stepper.next();
//   }
// });

// document.getElementById("step2Next").addEventListener("click", function () {
//   if (validateStep2()) {
//     currentStep = 3;
//     updateStepperProgress();
//     stepper.next();
//   }
// });

// document.getElementById("step2Back").addEventListener("click", function () {
//   currentStep = 1;
//   updateStepperProgress();
//   stepper.previous();
// });

// document.getElementById("step3Back").addEventListener("click", function () {
//   currentStep = 2;
//   updateStepperProgress();
//   stepper.previous();
// });

// // File upload functionality
// const fileUploadArea = document.getElementById("fileUploadArea");
// const fileInput = document.getElementById("cvFile");
// const uploadPrompt = document.getElementById("uploadPrompt");
// const uploadedFileContainer = document.getElementById("uploadedFileContainer");
// const uploadedFileName = document.getElementById("uploadedFileName");
// const removeFileBtn = document.getElementById("removeFileBtn");

// // File upload event listeners
// fileUploadArea.addEventListener("click", () => {
//   if (!uploadedFile) {
//     fileInput.click();
//   }
// });

// fileUploadArea.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   fileUploadArea.classList.add("dragover");
// });

// fileUploadArea.addEventListener("dragleave", () => {
//   fileUploadArea.classList.remove("dragover");
// });

// fileUploadArea.addEventListener("drop", (e) => {
//   e.preventDefault();
//   fileUploadArea.classList.remove("dragover");

//   const files = e.dataTransfer.files;
//   if (files.length > 0) {
//     handleFileUpload(files[0]);
//   }
// });

// fileInput.addEventListener("change", (e) => {
//   if (e.target.files.length > 0) {
//     handleFileUpload(e.target.files[0]);
//   }
// });

// removeFileBtn.addEventListener("click", (e) => {
//   e.stopPropagation();
//   removeFile();
// });

// function handleFileUpload(file) {
//   // Validate file type
//   const allowedTypes = [".pdf", ".doc", ".docx"];
//   const fileExtension = "." + file.name.split(".").pop().toLowerCase();

//   if (!allowedTypes.includes(fileExtension)) {
//     alert("Please upload a PDF, DOC, or DOCX file.");
//     return;
//   }

//   // Validate file size (10MB)
//   if (file.size > 10 * 1024 * 1024) {
//     alert("File size should not exceed 10MB.");
//     return;
//   }

//   uploadedFile = file;
//   uploadedFileName.textContent = file.name;
//   uploadPrompt.style.display = "none";
//   uploadedFileContainer.style.display = "block";
//   fileUploadArea.style.padding = "0";
// }

// function removeFile() {
//   uploadedFile = null;
//   fileInput.value = "";
//   uploadPrompt.style.display = "block";
//   uploadedFileContainer.style.display = "none";
//   fileUploadArea.style.padding = "24px";
// }

// // Form submission
// document
//   .getElementById("multiStepForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     if (validateStep3()) {
//       // Hide all step content
//       document.querySelectorAll(".step-content").forEach((content) => {
//         content.classList.remove("active");
//         content.style.display = "none";
//       });

//       // Show success message
//       document.getElementById("success-step").style.display = "block";
//       document.getElementById("success-step").classList.add("active");

//       // Update stepper appearance
//       document.querySelectorAll(".step").forEach((step) => {
//         step.classList.add("completed");
//       });

//       // Here you would normally send the data to your server
//       console.log("Form submitted successfully!");

//       // Get form data
//       const formData = new FormData(this);
//       const data = {};
//       for (let [key, value] of formData.entries()) {
//         data[key] = value;
//       }
//       console.log("Form data:", data);
//     }
//   });

// // Real-time validation

// document.querySelectorAll("input, select, textarea").forEach((field) => {
//   field.addEventListener("blur", function () {
//     const stepContent = this.closest(".step-content");
//     if (stepContent.id === "step-1") {
//       validateStep1();
//     } else if (stepContent.id === "step-2") {
//       validateStep2();
//     } else if (stepContent.id === "step-3") {
//       validateStep3();
//     }
//   });

//   field.addEventListener("input", function () {
//     // Remove error styling when user starts typing
//     if (this.classList.contains("error")) {
//       this.classList.remove("error");
//       const errorElement = document.getElementById(this.id + "-error");
//       if (errorElement) {
//         errorElement.classList.remove("show");
//       }
//     }
//   });
// });

// // Set default date to match the UI (13-09-1992)
// document.getElementById("dob").value = "1992-09-13";
