document.addEventListener("DOMContentLoaded", function () {
  const groupForm = document.getElementById("editGroupForm");
  const groupRadios = document.getElementsByName("editGroupRadio");
  const groupRadioFeedback = document.getElementById(
    "editGroupRadioFeedback"
  );

  // Variables de toast de éxito
  const editGroupSuccessToast = document.getElementById(
    "editGroupSuccessToast"
  );
  const successToastBootstrap = bootstrap.Toast.getOrCreateInstance(
    editGroupSuccessToast
  );
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  //Offcanvas
  const offcanvasElement = document.getElementById("offcanvasEditGroup");
  const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);

  groupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Validación de los inputs radio
    let radioChecked = false;
    for (const radio of groupRadios) {
      if (radio.checked) {
        radioChecked = true;
        break;
      } else {
        radio.classList.add("is-invalid");
      }
    }

    // Se agregan clases a inputs radio y texto de radio en caso de ser inválidos
    if (!radioChecked) {
      groupRadioFeedback.style.display = "block";
      for (const radio of groupRadios) {
        radio.classList.add("is-invalid");
      }
      isValid = false;
    } else {
      groupRadioFeedback.style.display = "none";
      for (const radio of groupRadios) {
        radio.classList.remove("is-invalid");
      }
    }
    // Restablecer los campos del formulario
    function resetFormInputs() {
      groupForm.reset();
      for (const radio of groupRadios) {
        radio.classList.remove("is-invalid");
      }
      groupRadioFeedback.style.display = "none";
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
  groupRadios.forEach((radio) => {
    radio.addEventListener("focus", function () {
      groupRadios.forEach((radio) => {
        radio.classList.remove("is-invalid");
      });
      groupRadioFeedback.style.display = "none";
    });
  });
});
