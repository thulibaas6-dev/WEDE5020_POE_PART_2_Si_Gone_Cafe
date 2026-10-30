
document.addEventListener("DOMContentLoaded", () => {

// 1. ENQUIRY FORM VALIDATION and the  COST CALC
  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

const name =document.getElementById("enquiryName").value.trim();
const email =document.getElementById("enquiryEmail").value.trim();
    const service =document.getElementById("enquiryService").value;
    const quantity=parseInt(document.getElementById("enquiryQuantity").value, 10);
    const feedback=document.getElementById("enquiryFeedback");

    // Simple email regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!name || name.length < 2) {
feedback.style.color ="red";
feedback.textContent="Please enter your full name.";
    return;}
    if (!emailRegex.test(email)) {
feedback.style.color="red";
feedback.textContent ="Please enter a valid email address.";
    return;}
    if (isNaN(quantity) || quantity <= 0) {
      feedback.style.color = "red";
      feedback.textContent = "Quantity must be at least 1.";
      return;
    }

    // The Dynamic Price Calculation
    let price = 0;
    if (service.includes("Coffee Catering")) price = 50;
    else if (service.includes("Pastry Platter")) price = 250;
    else if (service.includes("Venue Booking")) price = 1500;

    const totalCost = price * quantity;
feedback.style.color = "green";
feedback.innerHTML = `
  Thank you, <strong>${name}</strong>!<br>
  Your enquiry for <strong>${quantity}x ${service}</strong> has been received.<br>
  <strong>Estimated Cost: R${totalCost}</strong>. A quote will be emailed to ${email}.`;

enquiryForm.reset();
    });
  }


// 2. CONTACT FORM VALIDATION

  const contactForm=document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

const name=document.getElementById("contactName")?.value.trim();
const email=document.getElementById("contactEmail")?.value.trim();
const message=document.getElementById("contactMessage")?.value.trim();
const feedback=document.getElementById("contactFeedback");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!name || !email || !message) {
  if (feedback) {
    feedback.style.color = "red";
    feedback.textContent = "Please complete all fields before sending.";
  }
  return;
}

if (!emailRegex.test(email)) {
  if (feedback) {
    feedback.style.color = "red";
    feedback.textContent = "Please enter a valid email address.";
  }
  return;
}

if (feedback) {
  feedback.style.color = "green";
  feedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
}

contactForm.reset();
    });
  }


// 3. LEAFLET MAP (Contact.html)
const mapElement = document.getElementById("map");
if (mapElement) {
  const map = L.map('map').setView([-26.1929, 28.0306], 15);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
  }).addTo(map);

  L.marker([-26.1929, 28.0306]).addTo(map)
    .bindPopup('<b>Si Gone Cafe</b><br>Braamfontein, Johannesburg')
    .openPopup();
}




// 4. LIGHTBOX GALLERY (Gallery.html)
  const galleryImgs = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");

  if (lightbox && galleryImgs.length > 0) {
    galleryImgs.forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });

    if (closeLightbox) {
      closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.style.display = "none";
    });
  }
// 5. DYNAMIC SEARCH FILTER (Sevices.html)
  const searchInput = document.getElementById("serviceSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const term =e.target.value.toLowerCase();
      const cards = document.querySelectorAll(".service-card");

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? "block" : "none";
      });
    });
  }

});
