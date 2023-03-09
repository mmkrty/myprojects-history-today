const showYear = document.querySelector(".date-year");
const showMonth = document.querySelector(".date-month");
const showDay = document.querySelector(".date-day");

const contentDes = document.querySelector(".content-description");
const count = document.querySelectorAll(".count");

const renderContainer = document.querySelector(".render-container");
const paginationContainer = document.getElementById("paginationContainer");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pagesContainer = document.getElementById("pagesContainer");

const btnSelected = document.querySelector(".selected");
const btnBirths = document.querySelector(".births");
const btnDeaths = document.querySelector(".deaths");
const btnEvents = document.querySelector(".events");
const btnHolidays = document.querySelector(".holidays");
const contentHeader = document.querySelector(".content-header");

let currentPage = 1;
const dataPerPage = 8;

let currentType;

//create date today
let today = new Date();
let month = today.getMonth() + 1;
let monthName = today.toLocaleString("en-us", { month: "long" });
let day = today.getDate();
let year = today.getUTCFullYear();

const showDate = () => {
  showDay.innerHTML = `${day}`;
  showMonth.innerHTML = `${monthName}`;
  showYear.innerHTML = `${year}`;
};

//api authorization and fetching data
let data;
let endpoint;
const token = config.access_token;
const headers = {
  Authorization: token,
  "Api-user-agent": "mmkrty@gmail.com",
};

const createEndpoint = function (lang = "en", type) {
  endpoint = `https://api.wikimedia.org/feed/v1/wikipedia/${lang}/onthisday/${type}/${month}/${day}`;
};

async function getData() {
  const res = await axios.get(endpoint, headers);
  console.log(res.data);
  data = res.data;
  console.log(data);
}

// function to render the data on the page
function renderData() {
  renderContainer.innerHTML = "";
  const dataList = data[currentType];
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const dataToRender = dataList.slice(startIndex, endIndex);

  for (const item of dataToRender) {
    const itemData = { img: "", title: "", year: "", text: "", link: "" };
    // create item object
    itemData.img = item.pages[0].thumbnail
      ? item.pages[0].thumbnail.source
      : "img/unknown_person.jpg";
    itemData.title = item.text;
    itemData.year = item.year;
    itemData.text = item.pages[0].extract;
    itemData.link = item.pages[0].content_urls.desktop.page;

    const dataElement = document.createElement("div");
    dataElement.classList.add("card");
    dataElement.innerHTML = `
    <div class="card__header">
      <img src="${itemData.img}" alt="person portrait" class="card__img">
    </div>
  
    <div class="card__content">
      <h3 class="card__title-medium">${itemData.title}</h3>
      <p class="card__content-text">${itemData.text}</p>
      <a href="${itemData.link}" class="card__content-link" target="_blank">Read More <span class="arrow">&rarr;</span></a>
    </div>
    `;
    renderContainer.appendChild(dataElement);
  }
}

//render header
const renderHeader = function (type, length) {
  switch (type) {
    case "births":
      contentDes.innerHTML = `<span class="count">${length}</span> people were born today in history.`;
      break;

    case "deaths":
      contentDes.innerHTML = `<span class="count">${length}</span> people died today in history.`;
      break;

    case "events":
      contentDes.innerHTML = `<span class="count">${length}</span> events in history today.`;
      break;
    case "holidays":
      contentDes.innerHTML = `<span class="count">${length}</span> holidays today in history.`;
      break;

    case "selected":
      contentDes.innerHTML = `<span class="count">${length}</span> selected events in history for you. `;
      break;
  }
};

//paginization
function handlePagination(event) {
  paginationContainer.classList.remove("inactive");
  if (event.target.id === "previousPage" && currentPage > 1) {
    currentPage--;
    console.log(currentPage);
    renderData();
    renderPages();
  } else if (
    event.target.id === "nextPage" &&
    currentPage < Math.ceil(data[currentType].length / dataPerPage)
  ) {
    currentPage++;
    console.log(currentPage);
    renderData();
    renderPages();
  }
}

function renderPages() {
  // Dynamically create pagination buttons
  paginationContainer.classList.remove("inactive");
  const numPages = Math.ceil(data[currentType].length / dataPerPage);
  const pagesContainer = document.querySelector("#pagesContainer");
  pagesContainer.innerHTML = "";
  for (let i = 1; i <= numPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.classList.add("pageBtn");
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.classList.add("active");
    }
    pagesContainer.appendChild(pageBtn);
  }
  // Add an event listener to the page buttons
  const pageBtns = document.querySelectorAll(".pageBtn");
  pageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.textContent);
      console.log(currentPage);
      renderData();
    });
  });

  console.log("rendered", currentType);
}

showDate();
//adding eventlistners
btnSelected.addEventListener("click", function () {
  currentType = "selected";
  currentPage = 1;
  createEndpoint("en", currentType);
  getData().then(() => {
    renderData();
    renderHeader(currentType, data[currentType].length);
    renderPages();
    paginationContainer.addEventListener("click", handlePagination);
  });
});
btnBirths.addEventListener("click", function () {
  currentType = "births";
  currentPage = 1;
  createEndpoint("en", currentType);
  getData().then(() => {
    renderData();
    renderHeader(currentType, data[currentType].length);
    renderPages();
    paginationContainer.addEventListener("click", handlePagination);
  });
});
btnDeaths.addEventListener("click", function () {
  currentType = "deaths";
  currentPage = 1;
  createEndpoint("en", currentType);
  getData().then(() => {
    renderData();
    renderHeader(currentType, data[currentType].length);
    renderPages();
    paginationContainer.addEventListener("click", handlePagination);
  });
});
btnEvents.addEventListener("click", function () {
  currentType = "events";
  currentPage = 1;
  createEndpoint("en", currentType);
  getData().then(() => {
    renderData();
    renderHeader(currentType, data[currentType].length);
    renderPages();
    paginationContainer.addEventListener("click", handlePagination);
  });
});
btnHolidays.addEventListener("click", function () {
  currentType = "holidays";
  currentPage = 1;
  createEndpoint("en", currentType);
  getData().then(() => {
    renderData();
    renderHeader(currentType, data[currentType].length);
    renderPages();
    paginationContainer.addEventListener("click", handlePagination);
  });
});
