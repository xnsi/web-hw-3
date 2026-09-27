"use strict";

// ДЗ 3. Интерактивная коллекция.
// Выполняйте практические этапы из docs/HOME_WORK.md по порядку.
// Не пытайтесь написать весь файл за один раз: после каждого этапа проверяйте
// связанный сценарий в браузере и фиксируйте рабочее состояние коммитом.

// Этап 2. Найдите карточки и элементы панели подробностей.
// Реализуйте одну общую функцию выбора карточки.
const cards = document.querySelectorAll(".collection-card");
const detailsPanel = document.querySelector(".details-panel");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const initialTitle = detailsTitle.textContent;
const initialDescription = detailsDescription.textContent;

function selectCard(card) {
  cards.forEach((item) => {
    item.classList.remove("collection-card--selected");
    item.setAttribute("aria-pressed", "false");
  });

  card.classList.add("collection-card--selected");
  card.setAttribute("aria-pressed", "true");
  detailsTitle.textContent = card.dataset.title;
  detailsDescription.textContent = card.dataset.description;

  detailsPanel.classList.remove("details-panel--pulse");
  void detailsPanel.offsetWidth;
  detailsPanel.classList.add("details-panel--pulse");
}

cards.forEach((card) => {
  card.addEventListener("click", () => selectCard(card));
});

// Этап 3. Найдите кнопки фильтров.
// Показывайте подходящие карточки, обновляйте активную кнопку и счетчик.
// Учтите случай, когда новый фильтр скрывает выбранную карточку.
const filterButtons = document.querySelectorAll(".filter-button");
const visibleCount = document.querySelector("#visible-count");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("filter-button--active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("filter-button--active");
    button.setAttribute("aria-pressed", "true");

    let count = 0;

    cards.forEach((card) => {
      const hidden =
        button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;

      card.classList.toggle("collection-card--hidden", hidden);
      if (!hidden) count += 1;
    });

    visibleCount.textContent = count;

    const selectedCard = document.querySelector(".collection-card--selected");

    if (selectedCard?.classList.contains("collection-card--hidden")) {
      selectedCard.classList.remove("collection-card--selected");
      selectedCard.setAttribute("aria-pressed", "false");
      detailsTitle.textContent = initialTitle;
      detailsDescription.textContent = initialDescription;
    }
  });
});

// Этап 4. Реализуйте случайный выбор среди видимых карточек.
const randomButton = document.querySelector("#random-button");

randomButton.addEventListener("click", () => {
  const selectedCard = document.querySelector(".collection-card--selected");
  let visibleCards = [...cards].filter(
    (card) => !card.classList.contains("collection-card--hidden"),
  );

  if (visibleCards.length > 1) {
    visibleCards = visibleCards.filter((card) => card !== selectedCard);
  }

  const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
  selectCard(randomCard);
});

// Этап 5. Реализуйте полный сброс интерфейса.

// Этап 6. Запускайте подготовленную CSS-анимацию через класс.
// Не дублируйте оформление в script.js.
