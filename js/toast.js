// Toast CONFIGURACION
const configToastTrigger = document.getElementById("configToastBtn");
const successConfigToast = document.getElementById("successConfigToast");
const dangerConfigToast = document.getElementById("dangerConfigToast");

// Toast Éxito ACTIVAR TRANSCRIPCIONES
const activateTrancripToastTrigger = document.getElementById(
  "activateTrancripToastBtn"
);
const activateTrancripToast = document.getElementById("activateTrancripToast");
const activateTrancripAlert = document.getElementById("activateTrancripAlert");
const checkbox = document.getElementById("flexCheckboxDefault1");


const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
if (configToastTrigger) {
  if (successConfigToast) {
    const successToastBootstrap =
      bootstrap.Toast.getOrCreateInstance(successConfigToast);
    configToastTrigger.addEventListener("click", () => {
      successToastBootstrap.show();
      scrollToBottom();
    });
  }
  if (dangerConfigToast) {
    const dangerToastBootstrap =
      bootstrap.Toast.getOrCreateInstance(dangerConfigToast);
    configToastTrigger.addEventListener("click", () => {
      dangerToastBootstrap.show();
      scrollToBottom();
    });
  }
}
if (activateTrancripToastTrigger) {
  if (activateTrancripToast) {
    const activateTrancripToastBootstrap = bootstrap.Toast.getOrCreateInstance(
      activateTrancripToast
    );
    activateTrancripToastTrigger.addEventListener("click", () => {
      activateTrancripToastBootstrap.show();
      activateTrancripAlert.classList.add("d-none");
      checkbox.setAttribute("checked", "true");
      scrollToBottom();
    });
  }
}

// Toast Éxito Contacto eliminado
const deleteContactTrigger = document.getElementById("deleteContactBtn");
const deleteContactToast = document.getElementById("deleteContactToast");

if (deleteContactTrigger) {
  if (deleteContactToast) {
    const deleteContactToastBootstrap =
      bootstrap.Toast.getOrCreateInstance(deleteContactToast);
    deleteContactTrigger.addEventListener("click", () => {
      deleteContactToastBootstrap.show();
      scrollToBottom();
    });
  }
}
// Toast Éxito Grupo eliminado
const deleteGroupTrigger = document.getElementById("deleteGroupBtn");
const deleteGroupToast = document.getElementById("deleteGroupToast");

if (deleteGroupTrigger) {
  if (deleteGroupToast) {
    const deleteGroupToastBootstrap =
      bootstrap.Toast.getOrCreateInstance(deleteGroupToast);
    deleteGroupTrigger.addEventListener("click", () => {
      deleteGroupToastBootstrap.show();
      scrollToBottom();
    });
  }
}
