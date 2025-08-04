document.getElementById("trackForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const program = document.getElementById("program").value;
  const emailOrPhone = document.getElementById("emailOrPhone").value;

  // Validate form inputs
  let isValid = true;
  if (!program) {
    document.getElementById("program-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("program-error").style.display = "none";
  }

  if (!emailOrPhone) {
    document.getElementById("emailOrPhone-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("emailOrPhone-error").style.display = "none";
  }

  if (!isValid) return;

  // Store form values in a variable
  const formData = {
    program,
    emailOrPhone,
  };

  console.log(formData, "form");

  // Display track status and hide FAQ

  document.getElementById("track-status").style.display = "block";
  document.getElementById("faq").style.display = "none";
});
