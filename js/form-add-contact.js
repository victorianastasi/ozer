document.addEventListener("DOMContentLoaded", function () {
    // Variables de Buscador
    const items = [
        "Andrés Iniesta",
        "Adam Sandler",
        "Adele",
        "Arnold Schwarzenegger",
        "Alicia Keys",
      ];
    const searchInput = document.getElementById("contactSearchInput");
    const suggestionsContainer = document.getElementById("suggestionsContainer");
    let suggestionSelected = false;
  
    //Variables de formulario
    const contactForm = document.getElementById("addContactForm");
    const contactRadios = document.getElementsByName("contactRadio");
    const contactRadioFeedback = document.getElementById("contactRadioFeedback");
  
    // Variables de toast de éxito
    const addContactSuccessToast = document.getElementById("addContactSuccessToast");
    const addContactSuccessToastBootstrap =
      bootstrap.Toast.getOrCreateInstance(addContactSuccessToast);
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    };
  
    //Variables de Offcanvas
    const offcanvasElementAddContact = document.getElementById("offcanvasAddContact");
    const offcanvasInstanceAddContact = new bootstrap.Offcanvas(
      offcanvasElementAddContact
    );
  
    //Sugerencias del buscador
    function updateSuggestions() {
      const input = searchInput.value.toLowerCase();
      suggestionsContainer.innerHTML = "";
      suggestionSelected = false;
  
      if (input.length === 0) return;
  
      const suggestions = items.filter((item) =>
        item.toLowerCase().includes(input)
      );
  
      if (suggestions.length === 0) {
        const noResultsElement = document.createElement("div");
        noResultsElement.classList.add("no-results");
        noResultsElement.textContent = "No se encontraron resultados";
        suggestionsContainer.appendChild(noResultsElement);
        suggestionSelected = false;
      } else {
        const suggestionList = document.createElement("ul");
        suggestionList.classList.add("suggestion-list");
  
        suggestions.forEach((suggestion) => {
          const suggestionElement = document.createElement("li");
          suggestionElement.classList.add("suggestion-list__item");
  
          const button = document.createElement("button");
          button.textContent = suggestion;
          button.classList.add("suggestion-button");
  
          button.addEventListener("click", function () {
            searchInput.value = suggestion;
            suggestionsContainer.innerHTML = "";
            suggestionSelected = true;
          });
  
          button.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
              searchInput.value = suggestion;
              suggestionsContainer.innerHTML = "";
              suggestionSelected = true;
            }
          });
  
          // Evento focusout para cerrar la lista cuando se pierde el foco
          button.addEventListener("focusout", function (event) {
            setTimeout(function () {
              if (!suggestionsContainer.contains(document.activeElement)) {
                suggestionsContainer.innerHTML = "";
              }
            }, 100);
          });
  
          suggestionElement.appendChild(button);
          suggestionList.appendChild(suggestionElement);
        });
  
        suggestionsContainer.appendChild(suggestionList);
      }
      return suggestionSelected;
    }
  
    searchInput.addEventListener("keyup", updateSuggestions);
  
    searchInput.addEventListener("focus", function () {
      if (searchInput.value.length > 0) {
        updateSuggestions();
      }
    });
  
    searchInput.addEventListener("blur", function () {
      setTimeout(function () {
        if (
          !suggestionSelected &&
          !suggestionsContainer.contains(document.activeElement)
        ) {
          searchInput.value = "";
          suggestionsContainer.innerHTML = "";
        }
      }, 100);
    });
  
    document.addEventListener("click", function (event) {
      if (
        !suggestionsContainer.contains(event.target) &&
        event.target !== searchInput
      ) {
        suggestionsContainer.innerHTML = "";
      }
    });
  
    // Validacion de fomulario
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      let isValid = true;
  
      // Validación del input de búsqueda de contacto
      if (!suggestionSelected) {
        searchInput.classList.add("is-invalid");
        isValid = false;
      } else {
        searchInput.classList.remove("is-invalid");
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
  
        // Eliminación de las clases is-invalid
        searchInput.classList.remove("is-invalid");
        for (const radio of contactRadios) {
          radio.classList.remove("is-invalid");
        }
        contactRadioFeedback.style.display = "none";
      }
  
      // Envio del formulario si todos los campos son válidos
      if (isValid) {
        console.log("Formulario válido");
        if (offcanvasInstanceAddContact) {
          offcanvasInstanceAddContact.hide();
        }
        if (addContactSuccessToastBootstrap) {
          addContactSuccessToastBootstrap.show();
        }
        scrollToBottom();
        resetFormInputs();
        /* this.submit(); */
      } else {
        console.log("Formulario inválido");
      }
    });
  
    // Eliminar la clase is-invalid al hacer focus en los inputs
    searchInput.addEventListener("focus", function () {
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
  