document.addEventListener("DOMContentLoaded", function () {
  const groupForm = document.getElementById("addGroupForm");
  const groupSearchInput = document.getElementById("groupSearchInput");
  const groupRadios = document.getElementsByName("groupRadio");
  const groupRadioFeedback = document.getElementById("groupRadioFeedback");

  // Variables de toast de éxito
  const addGroupSuccessToast = document.getElementById(
    "addGroupSuccessToast"
  );
  const addGroupSuccessToastBootstrap = bootstrap.Toast.getOrCreateInstance(
    addGroupSuccessToast
  );
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  //Offcanvas
  const offcanvasElementAddGroup = document.getElementById(
    "offcanvasAddGroup"
  );
  const offcanvasInstanceAddGroup = new bootstrap.Offcanvas(
    offcanvasElementAddGroup
  );

  groupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Validación del input de búsqueda de contacto
    if (groupSearchInput.value.trim() === "") {
      groupSearchInput.classList.add("is-invalid");
      console.log(groupSearchInput.value)
      isValid = false;
    } else {
      groupSearchInput.classList.remove("is-invalid");
      console.log(groupSearchInput.value + "2")
    }

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

      // Eliminación de las clases is-invalid
      groupSearchInput.classList.remove("is-invalid");
      for (const radio of groupRadios) {
        radio.classList.remove("is-invalid");
      }
      groupRadioFeedback.style.display = "none";
    }

    // Envio del formulario si todos los campos son válidos
    if (isValid) {
      console.log("Formulario válido");
      if (offcanvasInstanceAddGroup) {
        offcanvasInstanceAddGroup.hide();
      }
      if (addGroupSuccessToastBootstrap) {
        addGroupSuccessToastBootstrap.show();
      }
      scrollToBottom();
      resetFormInputs();
      console.log(groupSearchInput.value)
      /* this.submit(); */
    } else {
      console.log("Formulario inválido");
    }
  });
  // Eliminar la clase is-invalid al hacer focus en los inputs
  groupSearchInput.addEventListener("focus", function () {
    this.classList.remove("is-invalid");
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
