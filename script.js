// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
      }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.about, .service-section, .section-divider, .gallery, .form').forEach(section => {
  observer.observe(section);
});

// Form submission (keeping your original functionality)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("https://formsubmit.co/ajax/danielsaggir@gmail.com", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
          name: document.querySelector('[name="name"]').value,
          phone: document.querySelector('[name="phone"]').value,
          email: document.querySelector('[name="email"]').value,
          message: document.querySelector('[name="message"]').value
      })
  })
  .then(response => {
      if (response.ok) {
          Swal.fire({
              title: 'תודה!',
              text: 'הטופס נשלח בהצלחה, נחזור אליכם בקרוב',
              icon: 'success',
              confirmButtonText: 'סגור'
          });
          document.getElementById("contactForm").reset();
      } else {
          Swal.fire({
              title: 'שגיאה',
              text: 'אירעה שגיאה בשליחה, נסו שוב',
              icon: 'error',
              confirmButtonText: 'סגור'
          });
      }
  })
  .catch(error => {
      Swal.fire({
          title: 'שגיאה',
          text: 'שגיאה ברשת, בדקו את החיבור ונסו שוב',
          icon: 'error',
          confirmButtonText: 'סגור'
      });
  });
});

// Smooth scrolling for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', function() {
  document.querySelector('.about').scrollIntoView({
      behavior: 'smooth'
  });
});