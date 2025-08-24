document.addEventListener("DOMContentLoaded", () => {
  // ווידאו כרקע
  const video = document.querySelector('.hero-video'); 
  if (video) {
    video.muted = true; // מבטיח שלא יחסם
    video.play().catch(() => {
      console.warn("Autoplay נחסם, המשתמש צריך ללחוץ");
    });
  }

  // כפתור וואטסאפ
  const whatsapp = document.querySelector(".whatsapp-wrapper");
  console.log("✅ WhatsApp script loaded");
  if (whatsapp) {
    function toggleWhatsApp() {
      if (window.scrollY > 50) {           
        whatsapp.classList.add("show");
      } else {
        whatsapp.classList.remove("show"); 
      }
    }
    window.addEventListener("scroll", toggleWhatsApp);
    toggleWhatsApp();
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('visible');
        });
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.about, .service-section, .section-divider, .testimonials, .faq, .form, .map-section'
  ).forEach(section => observer.observe(section));

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!isActive) faqItem.classList.add('active');
    });
  });

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 🕵️ בדיקת honeypot נגד בוטים
      if (this.querySelector('[name="website"]')?.value !== "") {
        console.warn("Bot detected, form blocked");
        return;
      }

      const formData = {
        name: this.querySelector('[name="name"]').value,
        phone: this.querySelector('[name="phone"]').value,
        email: this.querySelector('[name="email"]').value,
        message: this.querySelector('[name="message"]').value
      };

      const submitButton = this.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
      submitButton.disabled = true;

      fetch("https://formsubmit.co/ajax/shay482@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          Swal.fire({
            title: 'תודה!',
            text: 'הטופס נשלח בהצלחה, נחזור אליכם בקרוב',
            icon: 'success',
            confirmButtonText: 'סגור',
            confirmButtonColor: '#667eea'
          });
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(() => {
        Swal.fire({
          title: 'שגיאה',
          text: 'אירעה שגיאה בשליחה, נסו שוב או צרו קשר בוואטסאפ',
          icon: 'error',
          confirmButtonText: 'סגור',
          confirmButtonColor: '#667eea'
        });
      })
      .finally(() => {
        submitButton.innerHTML = originalContent;
        submitButton.disabled = false;
      });
    });
  }

  // Smooth scrolling for scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.querySelector('.about')?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  // Lazy loading for all images
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  // Accessibility improvements
  document.querySelectorAll('a').forEach(link => {
    if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
      const icon = link.querySelector('i');
      if (icon) {
        const className = icon.className;
        if (className.includes('facebook')) link.setAttribute('aria-label', 'פייסבוק');
        if (className.includes('instagram')) link.setAttribute('aria-label', 'אינסטגרם');
        if (className.includes('whatsapp')) link.setAttribute('aria-label', 'וואטסאפ');
      }
    }
  });

  // Phone number validation (רק ספרות, לא מוסיף מקף)
  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.substr(0, 10);
      e.target.value = value;
    });
  }

  // Escape key to close FAQ
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.faq-item.active').forEach(item => item.classList.remove('active'));
    }
  });
});
