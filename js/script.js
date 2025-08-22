document.addEventListener("DOMContentLoaded", () => {
  // Scroll animations
  const observerOptions = {
    threshold: 0.2, // מתי להפעיל את האנימציה (20% מהאלמנט במסך)
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('visible');
        });
        obs.unobserve(entry.target); // משחרר אחרי הפעלה 🚀
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
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.querySelector('[name="name"]').value,
      phone: document.querySelector('[name="phone"]').value,
      email: document.querySelector('[name="email"]').value,
      message: document.querySelector('[name="message"]').value
    };

    const submitButton = this.querySelector('button[type="submit"]');
    const originalContent = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
    submitButton.disabled = true;

    fetch("https://formsubmit.co/ajax/danielsaggir@gmail.com", {
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
        document.getElementById("contactForm").reset();
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

  // Smooth scrolling for scroll indicator
  document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.about').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // Add lazy loading to all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
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

  // Phone number validation
  const phoneInput = document.querySelector('input[type="tel"]');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.substr(0, 10);
    if (value.length >= 6) value = value.substr(0, 3) + '-' + value.substr(3);
    e.target.value = value;
  });

  // Escape key to close FAQ
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.faq-item.active').forEach(item => item.classList.remove('active'));
    }
  });
});
