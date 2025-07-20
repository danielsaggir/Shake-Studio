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
      alert("הטופס נשלח בהצלחה! נחזור אליך בקרוב.");
      document.getElementById("contactForm").reset();
    } else {
      alert("אירעה שגיאה בשליחה.");
    }
  })
  .catch(error => {
    alert("שגיאה ברשת.");
  });
});
