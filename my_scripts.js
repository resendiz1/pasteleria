
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_9m5rcfq",
      "template_cfgl7gs",
      this
    ).then(
      function () {
        alert("Correo enviado correctamente ");
      },
      function (error) {
        alert("Error al enviar ");
        console.error(error);
      }
    );
  });
