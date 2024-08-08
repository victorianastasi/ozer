document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("editContactForm");
  const contactRadios = document.getElementsByName("editContactRadio");
  const contactRadioFeedback = document.getElementById(
    "editContactRadioFeedback"
  );

  // Variables de toast de éxito
  const editContactSuccessToast = document.getElementById(
    "editContactSuccessToast"
  );
  const successToastBootstrap = bootstrap.Toast.getOrCreateInstance(
    editContactSuccessToast
  );
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  //Offcanvas
  const offcanvasElement = document.getElementById("offcanvasEditContact");
  const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

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
    // Restablecer los campos del formulario
    function resetFormInputs() {
      contactForm.reset();
      for (const radio of contactRadios) {
        radio.classList.remove("is-invalid");
      }
      contactRadioFeedback.style.display = "none";
    }

    // Envio del formulario si todos los campos son válidos
    if (isValid) {
      console.log("Formulario válido");
      successToastBootstrap.show();
      offcanvasInstance.hide();
      scrollToBottom();
      resetFormInputs();
      /* this.submit(); */
    } else {
      console.log("Formulario inválido");
    }
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
