const showYear = document.querySelector(".date-year");
const showMonth = document.querySelector(".date-month");
const showDay = document.querySelector(".date-day");

const btnSelected = document.querySelector(".selected");
const btnBirths = document.querySelector(".births");
const btnDeaths = document.querySelector(".deaths");
const btnEvents = document.querySelector(".events");
const btnHolidays = document.querySelector(".holidays");
const renderContainer = document.querySelector(".render-container");
const contentHeader = document.querySelector(".content-header");

const numberInput1 = document.querySelector(".number-input_1");
const contentDes = document.querySelector(".content-description");
const countForm = document.querySelector(".count-control");
const submitBtn = document.querySelector(".btn-submit");
const count = document.querySelectorAll(".count");

const paginationContainer = document.getElementById("paginationContainer");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;
const dataPerPage = 8; // number of data to show per page

let firstItem;
let typeNow;

//create date today
let today = new Date();
let month = today.getMonth() + 1;
let monthName = today.toLocaleString("en-us", { month: "long" });
let day = today.getDate();
let year = today.getUTCFullYear();

//api authorization
let endpoint;
const token = config.access_token;
const headers = {
  Authorization: token,
  "Api-user-agent": "mmkrty@gmail.com",
};

//functions

const createEndpoint = function (lang = "en", type) {
  endpoint = `https://api.wikimedia.org/feed/v1/wikipedia/${lang}/onthisday/${type}/${month}/${day}`;
};

const showDate = () => {
  showDay.innerHTML = `${day}`;
  showMonth.innerHTML = `${monthName}`;
  showYear.innerHTML = `${year}`;
};

const renderPeople = function (
  imgsrc = "img/unknown_person.jpg",
  name,
  year,
  text,
  url
) {
  const person = document.createElement("div");
  person.classList.add("card");
  person.innerHTML = `
  <div class="card__header">
    <img src="${imgsrc}" alt="person portrait" class="card__img">
  </div>

  <div class="card__content">
    <h3 class="card__title-large">${name}</h3>
    <p class="card__subtitle-large">${year}</p>
    <p class="card__content-text">${text}</p>
    <a href="${url}" class="card__content-link" target="_blank">Read More <span class="arrow">&rarr;</span></a>
  </div>
  `;

  renderContainer.appendChild(person);
};

const renderEvent = function (
  imgsrc = "img/unknown_person.jpg",
  name,
  year,
  text,
  url
) {
  const person = document.createElement("div");
  person.classList.add("card");
  person.innerHTML = `
  <div class="card__header">
    <img src="${imgsrc}" alt="person portrait" class="card__img">
  </div>

  <div class="card__content">
    <h3 class="card__title-medium">${name}</h3>
    <p class="card__subtitle-medium">${year}</p>
    <p class="card__content-text">${text}</p>
    <a href="${url}" class="card__content-link" target="_blank">Read More <span class="arrow">&rarr;</span></a>
  </div>
  `;

  renderContainer.appendChild(person);
};

const renderHoliday = function (
  imgsrc = "img/unknown_person.jpg",
  name,
  text,
  url
) {
  const person = document.createElement("div");
  person.classList.add("card");
  person.innerHTML = `
  <div class="card__header">
    <img src="${imgsrc}" alt="person portrait" class="card__img">
  </div>

  <div class="card__content">
    <h3 class="card__title-medium">${name}</h3>
    <p class="card__content-text">${text}</p>
    <a href="${url}" class="card__content-link" target="_blank">Read More <span class="arrow">&rarr;</span></a>
  </div>
  `;

  renderContainer.appendChild(person);
};

const renderHeader = function (type, length) {
  switch (type) {
    case "births":
      contentDes.innerHTML = `<span class="count">${length}</span> people were born today in history.`;
      countForm.classList.remove("inactive");
      break;

    case "deaths":
      contentDes.innerHTML = `<span class="count">${length}</span> people died today in history.`;
      countForm.classList.remove("inactive");
      break;

    case "events":
      contentDes.innerHTML = `<span class="count">${length}</span> things happened today in history.`;
      countForm.classList.remove("inactive");
      break;
    case "holidays":
      contentDes.innerHTML = `<span class="count">${length}</span> holidays today in history.`;
      countForm.classList.remove("inactive");
      break;

    case "selected":
      contentDes.innerHTML = `<span class="count">${length}</span> selected events in history for you. `;
      countForm.classList.remove("inactive");
      break;
  }
};

const saveData = function (data, type, number) {
  const savedData = {
    img: "",
    title: "",
    year: "",
    text: "",
    link: "",
    length: "",
  };
  // console.log(savedData);
  // console.log(data.births[number].thumbnail);
  // console.log(data.births[number].text);

  switch (type) {
    case "births":
      savedData.img = data.births[number].pages[0].thumbnail
        ? data.births[number].pages[0].thumbnail.source
        : "img/unknown_person.jpg";
      savedData.title = data.births[number].text;
      savedData.year = data.births[number].year;
      savedData.text = data.births[number].pages[0].extract;
      savedData.link = data.births[number].pages[0].content_urls.desktop.page;
      savedData.length = data.births.length;
      break;
    case "deaths":
      savedData.img = data.deaths[number].pages[0].thumbnail
        ? data.deaths[number].pages[0].thumbnail.source
        : "img/unknown_person.jpg";
      savedData.title = data.deaths[number].text;
      savedData.year = data.deaths[number].year;
      savedData.text = data.deaths[number].pages[0].extract;
      savedData.link = data.deaths[number].pages[0].content_urls.desktop.page;
      savedData.length = data.deaths.length;
      break;
    case "events":
      savedData.img = data.events[number].pages[0].thumbnail
        ? data.events[number].pages[0].thumbnail.source
        : "img/event.jpg";
      savedData.title = data.events[number].text;
      savedData.year = data.events[number].year;
      savedData.text = data.events[number].pages[0].extract;
      savedData.link = data.events[number].pages[0].content_urls.desktop.page;
      savedData.length = data.events.length;
      break;
    case "selected":
      savedData.img = data.selected[number].pages[0].thumbnail
        ? data.selected[number].pages[0].thumbnail.source
        : "img/event.jpg";
      savedData.title = data.selected[number].text;
      savedData.year = data.selected[number].year;
      savedData.text = data.selected[number].pages[0].extract;
      savedData.link = data.selected[number].pages[0].content_urls.desktop.page;
      savedData.length = data.selected.length;
      break;
    case "holidays":
      savedData.img = data.holidays[number].pages[0].thumbnail
        ? data.holidays[number].pages[0].thumbnail.source
        : "img/holiday.png";
      savedData.title = data.holidays[number].text;
      savedData.year = data.holidays[number].year;
      savedData.text = data.holidays[number].pages[0].extract;
      savedData.link = data.holidays[number].pages[0].content_urls.desktop.page;
      savedData.length = data.holidays.length;
      break;
  }

  // console.log(savedData);
  return savedData;
};

const loadTarget = function (data, type) {
  const { img, title, year, text, link, length } = data;

  switch (type) {
    case "births":
      renderHeader(type, length);
      renderPeople(img, title, year, text, link);
      break;
    case "deaths":
      renderHeader(type, length);
      renderPeople(img, title, year, text, link);
      break;
    case "events":
      renderHeader(type, length);
      renderEvent(img, title, year, text, link);
      break;
    case "holidays":
      renderHeader(type, length);
      renderHoliday(img, title, text, link);
      break;
    case "selected":
      renderHeader(type, length);
      renderEvent(img, title, year, text, link);
      break;
  }
};

const init = async function (type, num) {
  const res = await axios.get(endpoint, headers);
  console.log(res.data);
  const data = res.data;

  let savedData;
  let dataLength = loadLength(data, type);
  let startingItem = num - 1;

  let lastItem =
    dataLength >= startingItem + 5 ? startingItem + 5 : dataLength - 1;

  // console.log(startingItem);
  // console.log(lastItem);

  for (let i = startingItem; i < lastItem + 1; i++) {
    switch (type) {
      case "births":
        typeNow = "births";
        savedData = saveData(data, "births", i);
        loadTarget(savedData, "births");
        break;
      case "deaths":
        typeNow = "deaths";
        savedData = saveData(data, "deaths", i);
        loadTarget(savedData, "deaths");
        break;
      case "events":
        typeNow = "events";
        savedData = saveData(data, "events", i);
        loadTarget(savedData, "events");
        break;
      case "holidays":
        typeNow = "holidays";
        savedData = saveData(data, "holidays", i);
        loadTarget(savedData, "holidays");
        break;
      case "selected":
        typeNow = "selected";
        savedData = saveData(data, "selected", i);
        loadTarget(savedData, "selected");
        break;
    }
  }
};

const clearContainer = function () {
  renderContainer.innerHTML = "";
};

const randomNum = function (max) {
  return Math.floor(Math.random() * max);
};

const loadLength = function (data, type) {
  let length;
  switch (type) {
    case "births":
      length = data.births.length;
      break;
    case "deaths":
      length = data.deaths.length;
      break;
    case "events":
      length = data.events.length;
      break;
    case "holidays":
      length = data.holidays.length;
      break;
    case "selected":
      length = data.selected.length;
      break;
  }
  return length;
};

showDate();

//adding eventlistners
btnSelected.addEventListener("click", function () {
  clearContainer();
  createEndpoint("en", "selected");

  init("selected", 1);
});
btnBirths.addEventListener("click", function () {
  clearContainer();
  createEndpoint("en", "births");
  init("births", 1);
});
btnDeaths.addEventListener("click", function () {
  clearContainer();
  createEndpoint("en", "deaths");
  init("deaths", 1);
});
btnEvents.addEventListener("click", function () {
  clearContainer();
  createEndpoint("en", "events");
  init("events", 1);
});
btnHolidays.addEventListener("click", function () {
  clearContainer();
  createEndpoint("en", "holidays");
  init("holidays", 1);
});

submitBtn.addEventListener("click", function (e) {
  firstItem = Number(numberInput1.value);
  console.log(firstItem);
  createEndpoint("en", typeNow);
  console.log(endpoint);
  clearContainer();
  init(typeNow, firstItem);
});
