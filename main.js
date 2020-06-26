document
  .querySelector(".dropdown-menu")
  .addEventListener("click", function(evt) {
    evt.target.parentElement.previousElementSibling.innerText =
      evt.target.innerText;
  });

document
  .querySelector(".custom-range")
  .addEventListener("click", function(evt) {
    switch (evt.target.value) {
      case "1.2":
        evt.target.nextElementSibling.textContent =
          "1.2 - минимальный уровень физнагрузки или полное ее отсутствие (сидячая работа, отсутствие спорта)";
        break;
      case "1.3":
      case "1.4":
        evt.target.nextElementSibling.textContent =
          evt.target.value +
          " - легкий уровень активности (легкие физические упражнения около 3 раз за неделю, ежедневная утренняя зарядка, пешие прогулки)";
        break;
      case "1.5":
      case "1.6":
        evt.target.nextElementSibling.textContent =
          evt.target.value + " - средняя активность (спорт до 5 раз за неделю)";
        break;
      case "1.7":
      case "1.8":
        evt.target.nextElementSibling.textContent =
          evt.target.value +
          " - активность высокого уровня (активный образ жизни вкупе с ежедневными интенсивными тренировками)";
        break;
      case "1.9":
      case "2":
        evt.target.nextElementSibling.textContent =
          evt.target.value +
          " - экстремально высокая активность (спортивный образ жизни, тяжелый физический труд, длительные тяжелые тренировки каждый день)";
        break;
    }
  });

// коллбэк функция, на кнопку "Посчитать калории"
document
  .getElementById("calory-form")
  .addEventListener("submit", function(evt) {
    document.getElementById("loading").style.display = "block";
    document.getElementById("results").style.display = "none";
    setTimeout(calculateResults, 2000);
    evt.preventDefault();
  });

// Расчёт результатов

function calculateResults() {
  // Элементы из DOM
  const genderEl = document.getElementById("gender");
  const weightEl = document.getElementById("weight");
  const heightEl = document.getElementById("height");
  const yearsEl = document.getElementById("years");
  const phlActivityEl = document.getElementById("physical-activity");
  const saveWeightEl = document.getElementById("save-weight");
  const looseWeightEl = document.getElementById("loose-weight");
  const increaseWeightEl = document.getElementById("increase-weight");

  let kCal;
  console.log(genderEl.textContent);
  //Расчёт для мужчин
  if (genderEl.textContent === "Мужской") {
    kCal =
      (9.99 * parseFloat(weightEl.value) +
        6.25 * parseFloat(heightEl.value) -
        4.92 * parseFloat(yearsEl.value) -
        5) *
      parseFloat(phlActivityEl.value);
  } else if (genderEl.textContent === "Женский") {
    kCal =
      (9.99 * parseFloat(weightEl.value) +
        6.25 * parseFloat(heightEl.value) -
        4.92 * parseFloat(yearsEl.value) -
        161) *
      parseFloat(phlActivityEl.value);
  } else {
    showError("Пожалуйста, выберите пол!");
    return;
  }
  console.log(parseFloat(weightEl.value));
  if (isFinite(kCal)) {
    saveWeightEl.value = kCal.toFixed(2);
    looseWeightEl.value = (kCal - 0.15 * kCal).toFixed(2);
    increaseWeightEl.value = (kCal + 0.15 * kCal).toFixed(2);
    //отобразить результат
    document.getElementById("results").style.display = "block";
    // скрыть элемент загрузчик
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Заполните все поля корректно!");
  }
}

function showError(error) {
  // Скрытие элемента, загрузчика

  document.getElementById("loading").style.display = "none";
  // создание нового элемента
  const errorDiv = document.createElement("div");
  // получить элементы
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // стилизовать элемент с помощью классов bootstrap
  errorDiv.className = "alert alert-danger";
  // добавить текст ошибки в элемент
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
