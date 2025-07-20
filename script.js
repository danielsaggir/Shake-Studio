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
        icon: 'success',
        title: 'נשלח בהצלחה!',
        text: 'נחזור אליך בהקדם 😊',
        confirmButtonText: 'סגור'
      });
      document.getElementById("contactForm").reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'אירעה תקלה בשליחה. נסה שוב.',
        confirmButtonText: 'סגור'
      });
    }
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'שגיאת רשת',
      text: 'בדוק את החיבור ונסה שוב מאוחר יותר.',
      confirmButtonText: 'סגור'
    });
  });
});
