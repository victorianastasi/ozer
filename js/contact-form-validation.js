document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const contactSearchInput = document.getElementById("contactSearchInput");
  const contactRadios = document.getElementsByName("contactRadio");
  const contactRadioFeedback = document.getElementById("contactRadioFeedback");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Validación del input de búsqueda de contacto
    if (contactSearchInput.value.trim() === "") {
      contactSearchInput.classList.add("is-invalid");
      isValid = false;
    } else {
      contactSearchInput.classList.remove("is-invalid");
    }

    // Validación de los inputs radio
    let radioChecked = false;
    for (const radio of contactRadios) {
      if (radio.checked) {
        radioChecked = true;
        break;
      } else {
        radio.classList.add("is-invalid");
      }
    }

    // Se agregan clases a inputs radio y texto de radio en caso de ser inválidos
    if (!radioChecked) {
      contactRadioFeedback.style.display = "block";
      console.log(contactRadios);
      for (const radio of contactRadios) {
        radio.classList.add("is-invalid");
      }
      isValid = false;
    } else {
      contactRadioFeedback.style.display = "none";
      for (const radio of contactRadios) {
        radio.classList.remove("is-invalid");
      }
    }

    // Envio del formulario si todos los campos son válidos
    if (isValid) {
      console.log("Formulario válido, enviando...");
      this.submit();
    } else {
      console.log("Formulario inválido, no se envía.");
    }
  });
  // Eliminar la clase is-invalid al hacer focus en los inputs
  contactSearchInput.addEventListener("focus", function () {
    this.classList.remove("is-invalid");
  });

  // Eliminar la clase is-invalid al hacer focus en los radios
  contactRadios.forEach((radio) => {
    radio.addEventListener("focus", function () {
      contactRadios.forEach((radio) => {
        radio.classList.remove("is-invalid");
      });
      contactRadioFeedback.style.display = "none";
    });
  });
});
