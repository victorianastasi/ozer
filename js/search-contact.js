/* Buscador de Contacto  */
document.addEventListener("DOMContentLoaded", function () {
  const items = [
    "Andrés Iniesta",
    "Adam Sandler",
    "Adele",
    "Arnold Schwarzenegger",
    "Alicia Keys",
  ];
  const searchInput = document.getElementById("contactSearchInput");
  const suggestionsContainer = document.getElementById("suggestionsContainer");

  searchInput.addEventListener("keyup", function () {
    const input = searchInput.value.toLowerCase();
    suggestionsContainer.innerHTML = "";

    if (input.length === 0) return;

    const suggestions = items.filter((item) =>
      item.toLowerCase().includes(input)
    );

    if (suggestions.length === 0) {
      const noResultsElement = document.createElement("div");
      noResultsElement.classList.add("no-results");
      noResultsElement.textContent = "No se encontraron resultados";
      suggestionsContainer.appendChild(noResultsElement);
    } else {
      const suggestionList = document.createElement("ul");
      suggestionList.classList.add("suggestion-list");

      suggestions.forEach((suggestion) => {
        const suggestionElement = document.createElement("li");
        suggestionElement.classList.add("suggestion-list__item");
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener("click", function () {
          searchInput.value = suggestion;
          suggestionsContainer.innerHTML = "";
        });
        suggestionList.appendChild(suggestionElement);
      });

      suggestionsContainer.appendChild(suggestionList);
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !suggestionsContainer.contains(event.target) &&
      event.target !== searchInput
    ) {
      suggestionsContainer.innerHTML = "";
    }
  });
});
