document.addEventListener("DOMContentLoaded", function () {
  var customSelectElements,
    selectElement,
    selectLength,
    selectedDiv,
    optionsDiv,
    optionDiv,
    backdrop;

  // Se crea y agrega el backdrop al cuerpo del documento
  backdrop = document.createElement("DIV");
  backdrop.setAttribute("class", "backdrop");
  document.body.appendChild(backdrop);

  customSelectElements = document.getElementsByClassName("custom-select");
  selectLength = customSelectElements.length;

  for (let i = 0; i < selectLength; i++) {
    selectElement = customSelectElements[i].getElementsByTagName("select")[0];
    let optionsLength = selectElement.length;

    selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "select-selected");
    selectedDiv.setAttribute("tabindex", "0");
    selectedDiv.innerHTML =
      selectElement.options[selectElement.selectedIndex].innerHTML;
    customSelectElements[i].appendChild(selectedDiv);

    optionsDiv = document.createElement("DIV");
    optionsDiv.setAttribute("class", "select-items select-hide");

    // Se agrega título antes de las opciones
    var titleDiv = document.createElement("DIV");
    titleDiv.setAttribute("class", "select-title");

    var titleSpan = document.createElement("SPAN");
    titleSpan.innerHTML = "Seleccione una opción";
    titleDiv.appendChild(titleSpan);

    var closeButton = document.createElement("BUTTON");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("aria-label", "Cerrar");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.innerHTML =
      '<span class="material-symbols-outlined" aria-hidden="true">close</span>';
    closeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect();
    });
    titleDiv.appendChild(closeButton);

    optionsDiv.appendChild(titleDiv);

    for (let j = 1; j < optionsLength; j++) {
      optionDiv = document.createElement("DIV");
      optionDiv.setAttribute("tabindex", "0");
      optionDiv.innerHTML = selectElement.options[j].innerHTML;
      optionDiv.addEventListener("click", function (e) {
        let originalSelect =
          this.parentNode.parentNode.getElementsByTagName("select")[0];
        let selectedLength = originalSelect.length;
        let previousSelectedDiv = this.parentNode.previousSibling;

        for (let k = 0; k < selectedLength; k++) {
          if (originalSelect.options[k].innerHTML == this.innerHTML) {
            originalSelect.selectedIndex = k;
            previousSelectedDiv.innerHTML = this.innerHTML;
            let sameAsSelectedElements =
              this.parentNode.getElementsByClassName("same-as-selected");
            let sameAsSelectedLength = sameAsSelectedElements.length;

            for (let l = 0; l < sameAsSelectedLength; l++) {
              sameAsSelectedElements[l].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        previousSelectedDiv.click();
      });
      optionDiv.addEventListener("blur", function (e) {
        setTimeout(() => {
          if (!optionsDiv.contains(document.activeElement)) {
            closeAllSelect();
          }
        }, 10);
      });
      optionsDiv.appendChild(optionDiv);
    }
    customSelectElements[i].appendChild(optionsDiv);
    selectedDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      backdrop.style.display = this.classList.contains("select-arrow-active")
        ? "block"
        : "none";
    });

    selectedDiv.addEventListener("blur", function (e) {
      setTimeout(() => {
        if (!optionsDiv.contains(document.activeElement)) {
          closeAllSelect();
        }
      }, 10);
    });

    selectedDiv.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    closeButton.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    closeButton.addEventListener("blur", function (e) {
      setTimeout(() => {
        if (!optionsDiv.contains(document.activeElement)) {
          closeAllSelect();
        }
      }, 10);
    });

    Array.from(optionsDiv.children).forEach(function (child) {
      child.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
      child.addEventListener("blur", function (e) {
        setTimeout(() => {
          if (!optionsDiv.contains(document.activeElement)) {
            closeAllSelect();
          }
        }, 10);
      });
    });
  }

  function closeAllSelect(currentElement) {
    var selectItems,
      selectSelected,
      selectItemsLength,
      selectSelectedLength,
      arrayNo = [];
    selectItems = document.getElementsByClassName("select-items");
    selectSelected = document.getElementsByClassName("select-selected");
    selectItemsLength = selectItems.length;
    selectSelectedLength = selectSelected.length;

    for (let i = 0; i < selectSelectedLength; i++) {
      if (currentElement == selectSelected[i]) {
        arrayNo.push(i);
      } else {
        selectSelected[i].classList.remove("select-arrow-active");
      }
    }
    for (let i = 0; i < selectItemsLength; i++) {
      if (arrayNo.indexOf(i) == -1) {
        selectItems[i].classList.add("select-hide");
      }
    }

    // Se oculta el backdrop
    backdrop.style.display = "none";
  }

  document.addEventListener("click", closeAllSelect);

  //Validacion de formulario waitlist
  document
    .getElementById("waitlistForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;

      // Validación de correo electrónico
      const mailInput = document.getElementById("mailInput");
      const mailInputFeedback = document.getElementById("mailInputFeedback");
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

      // Validación de país
      const codeCustomSelect = document.getElementById("codeCustomSelect");
      const codeSelectFeedback = document.getElementById("codeSelectFeedback");

      if (!codeSelect.value) {
        codeCustomSelect.classList.add("is-invalid");
        codeSelectFeedback.style.display = "block";
        isValid = false;
      } else {
        codeCustomSelect.classList.remove("is-invalid");
        codeSelectFeedback.style.display = "none";
      }

      // Validación de número de teléfono
      const phoneInput = document.getElementById("phoneInput");
      const phoneInputFeedback = document.getElementById("phoneInputFeedback");
      if (!phoneInput.value) {
        phoneInput.classList.add("is-invalid");
        phoneInputFeedback.style.display = "block";
        isValid = false;
      } else {
        phoneInput.classList.remove("is-invalid");
        phoneInputFeedback.style.display = "none";
      }

      // Si todos los campos son válidos, se envía el formulario y se muestra texto de exito y se oculta el formulario
      if (isValid) {
        console.log("Formulario enviado correctamente.");
        document.getElementById("waitlistFormContent").classList.add("d-none");
        document
          .getElementById("waitlistSuccessContent")
          .classList.remove("d-none");
      }
    });

  // Al hacer clic o focus en el input, se sacan estilos de validaciones
  document.getElementById("mailInput").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    document.getElementById("mailInputFeedback").style.display = "none";
  });

  document
    .getElementById("codeCustomSelect")
    .addEventListener("click", function () {
      this.classList.remove("is-invalid");
      document.getElementById("codeSelectFeedback").style.display = "none";
    });

  document.getElementById("phoneInput").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    document.getElementById("phoneInputFeedback").style.display = "none";
  });
});
