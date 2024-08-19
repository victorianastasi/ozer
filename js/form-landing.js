document.addEventListener("DOMContentLoaded", function () {
  /// Función para actualizar el contador de caracteres de textarea Message
  const textarea = document.getElementById("landingContactMsg");
  const charCount = document.getElementById("charCount");

  textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute("maxlength");
    charCount.textContent = `${currentLength}/${maxLength}`;
  });

  //Validacion de formulario Landing Contact
  document
    .getElementById("landingContactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;

      // Validación de correo electrónico
      const mailInput = document.getElementById("landingContactMail");
      const mailInputFeedback = document.getElementById("landingMailFeedback");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!mailInput.value) {
        mailInput.classList.add("is-invalid");
        mailInputFeedback.style.display = "block";
        isValid = false;
      } else if (!emailRegex.test(mailInput.value)) {
        mailInput.classList.add("is-invalid");
        mailInputFeedback.style.display = "block";
        mailInputFeedback.textContent = "El correo electrónico no es válido.";
        isValid = false;
      } else {
        mailInput.classList.remove("is-invalid");
        mailInputFeedback.style.display = "none";
      }

      // Validación de input Name
      const landingContactName = document.getElementById("landingContactName");
      const landingNameFeedback = document.getElementById(
        "landingNameFeedback"
      );
      if (!landingContactName.value) {
        landingContactName.classList.add("is-invalid");
        landingNameFeedback.style.display = "block";
        isValid = false;
      } else {
        landingContactName.classList.remove("is-invalid");
        landingNameFeedback.style.display = "none";
      }

      // Validación de input Message
      const landingContactMsg = document.getElementById("landingContactMsg");
      const landingMsgFeedback = document.getElementById("landingMsgFeedback");
      if (!landingContactMsg.value) {
        landingContactMsg.classList.add("is-invalid");
        landingMsgFeedback.style.display = "block";
        isValid = false;
      } else {
        landingContactMsg.classList.remove("is-invalid");
        landingMsgFeedback.style.display = "none";
      }

      // Si todos los campos son válidos, se envía el formulario y se muestra texto de exito y se oculta el formulario
      if (isValid) {
        console.log("Formulario enviado correctamente.");
        document.getElementById("landingContactForm").classList.add("d-none");
        document
          .getElementById("landingContactFormSuccess")
          .classList.remove("d-none");
      }
    });

  // Al hacer clic o focus en el input, se sacan estilos de validaciones
  document
    .getElementById("landingContactName")
    .addEventListener("focus", function () {
      this.classList.remove("is-invalid");
      document.getElementById("landingNameFeedback").style.display = "none";
    });

  document
    .getElementById("landingContactMail")
    .addEventListener("focus", function () {
      this.classList.remove("is-invalid");
      document.getElementById("landingMailFeedback").style.display = "none";
    });

  document
    .getElementById("landingContactMsg")
    .addEventListener("focus", function () {
      this.classList.remove("is-invalid");
      document.getElementById("landingMsgFeedback").style.display = "none";
    });
});
