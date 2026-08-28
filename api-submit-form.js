// Paste your deployed Google Apps Script Web App URL below.
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const form = document.getElementById("blogForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function showMessage(message, success = true) {
  formMessage.textContent = message;
  formMessage.className = `rounded-xl px-4 py-3 text-sm font-medium ${
    success
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-700"
  }`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
    showMessage("Please add your Google Apps Script Web App URL in api-submit-form.js first.", false);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  formMessage.className = "hidden";

  // URLSearchParams avoids a browser CORS preflight with Google Apps Script.
  const formData = new FormData(form);
  const data = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    data.append(key, value);
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: data
    });

    // no-cors means the browser cannot read Google's response.
    // A completed fetch is treated as submitted.
    showMessage("Your post was submitted successfully and saved to Google Sheets!");
    form.reset();
  } catch (error) {
    console.error(error);
    showMessage("Something went wrong. Please check your Apps Script URL and deployment settings.", false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Post";
  }
});
