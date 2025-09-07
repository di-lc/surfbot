/* ==========================
   HEADER / MENU
   ========================== */

/* --- Element selectors --- */
const toggleBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".menu-close");
const nav = document.querySelector(".main-nav");

/* --- Open the menu --- */
toggleBtn.addEventListener("click", () => {
  nav.classList.add("open");
});

/* --- Close the menu --- */
closeBtn.addEventListener("click", () => {
  nav.classList.remove("open");
});

/* --- Close menu when clicking on any link --- */
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

/* ==========================
   DOM CONTENT LOADED
   ========================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
     ENROLL FORM - PAYMENT OPTIONS
     ========================== */
  const paymentOptions = document.querySelectorAll(".payment-option");

  paymentOptions.forEach((option) => {
    option.addEventListener("click", () => {
      paymentOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
    });
  });

  /* ==========================
     ENROLL SIDEBAR - PLAN SELECTOR
     ========================== */
  const planOptions = document.querySelectorAll(".plan-option");
  const planDetails = document.getElementById("plan-details");
  const paymentInfo = document.querySelector(".payment-info");

  const plans = {
    kids: {
      title: "KIDS",
      items: [
        "Ages from 5 to 15 years",
        "Gear provided",
        "Friday to Saturday times",
        "2 hours straight session",
      ],
      price: "$49.00 / Lesson",
    },
    adult: {
      title: "ADULT",
      items: [
        "Ages from 16 to 80 years",
        "Gear provided",
        "Friday to Saturday times",
        "3 hours straight session",
      ],
      price: "$69.00 / Lesson",
    },
    pro: {
      title: "PRO",
      items: [
        "3 years surfing experience",
        "You must bring your gear",
        "Friday to Saturday times",
        "4 hours straight session",
      ],
      price: "$99.00 / Lesson",
    },
  };

  /* --- Update the lesson box according to selected plan --- */
  function updateLessonBox(planKey) {
    const plan = plans[planKey];
    if (!plan) return;

    planDetails.querySelector("h2").textContent = plan.title;

    const ul = planDetails.querySelector("ul");
    ul.innerHTML = "";
    plan.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    planDetails.querySelector("p").textContent = plan.price;

    const iconContainer = planDetails.querySelector(".surfbot-icon");
    iconContainer.innerHTML = "";
    let iconsCount = planKey === "adult" ? 2 : planKey === "pro" ? 3 : 1;
    for (let i = 0; i < iconsCount; i++) {
      const img = document.createElement("img");
      img.src = "./icones/surfbot-icon.svg";
      img.alt = "Surfbot Icon";
      iconContainer.appendChild(img);
    }

    paymentInfo.textContent = `Your card will be charged ${plan.price}`;
  }

  planOptions.forEach((option) => {
    option.addEventListener("click", () => {
      planOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      option.querySelector('input[type="radio"]').checked = true;

      const planKey = option.querySelector('input[type="radio"]').value;
      updateLessonBox(planKey);
    });
  });

  /* ==========================
     ENROLL FORM SUBMIT - OVERLAY
     ========================== */
  const enrollForm = document.querySelector(".enroll-form");
  if (!enrollForm) return;

  /* --- Create overlay --- */
  let overlay = document.createElement("div");
  overlay.className = "confirmation-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.backdropFilter = "blur(5px)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";
  overlay.style.transition = "opacity 0.3s";

  /* --- Create confirmation message box --- */
  let confirmation = document.createElement("div");
  confirmation.className = "confirmation-message";
  confirmation.style.background = "linear-gradient(135deg, #17222d, #445566)";
  confirmation.style.color = "#fafafa";
  confirmation.style.padding = "20px 30px";
  confirmation.style.borderRadius = "12px";
  confirmation.style.fontWeight = "bold";
  confirmation.style.fontFamily = "'Nunito', sans-serif";
  confirmation.style.textAlign = "center";
  confirmation.style.maxWidth = "80%";
  confirmation.style.minWidth = "250px";
  confirmation.style.minHeight = "50px";
  confirmation.style.display = "flex";
  confirmation.style.alignItems = "center";
  confirmation.style.justifyContent = "center";
  confirmation.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
  confirmation.style.zIndex = "10000";
  confirmation.style.opacity = "0";
  confirmation.style.transition = "opacity 0.3s";

  overlay.appendChild(confirmation);
  document.body.appendChild(overlay);

  /* --- Function to show confirmation message --- */
  function showConfirmation(text) {
    confirmation.textContent = text;
    overlay.style.display = "flex";

    requestAnimationFrame(() => {
      confirmation.style.opacity = "1";
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    /* --- Auto hide after 6 seconds with fade-out --- */
    setTimeout(() => {
      confirmation.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500);
    }, 6000);
  }

  /* --- Form submit event --- */
  enrollForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedPlan = document.querySelector(
      '.plan-option.active input[type="radio"]'
    ).value;
    const planTitle = document.querySelector("#plan-details h2").textContent;
    const planPrice = document.querySelector("#plan-details p").textContent;

    showConfirmation(
      `Matrícula realizada! Plano: ${planTitle} (${selectedPlan}) por ${planPrice}.`
    );

    enrollForm.reset();

    /* --- Reset plan selection to default --- */
    document.querySelector(".plan-option.active").classList.remove("active");
    const defaultPlan = document.querySelector(
      '.plan-option input[value="kids"]'
    );
    defaultPlan.checked = true;
    defaultPlan.parentElement.classList.add("active");

    updateLessonBox("kids");
  });
});
