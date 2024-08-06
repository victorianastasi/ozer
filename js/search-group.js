document.addEventListener("DOMContentLoaded", function () {
  const items = [
    "Familia",
    "Fútbol",
    "Consorcio",
    "Los mejores del mundo mundial - Campeones del mundo",
    "Primos",
  ];
  const searchInput = document.getElementById("groupSearchInput");
  const suggestionsContainer = document.getElementById("suggestionsContainer");

  let suggestionSelected = false;

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
          console.log(searchInput.value);
        });

        button.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            searchInput.value = suggestion;
            suggestionsContainer.innerHTML = "";
            suggestionSelected = true;
            console.log(searchInput.value);
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
});
