let productsData = null;
//
let totalPrice = 0;
let priceCoffe = 0;
let priceSize = 0;
let priceAdd = 0;
let selectedSize = "s";
let selectedAdd = [];

const buttonsType = document.querySelectorAll(".button-type");
const buttonCoffee = document.querySelector("#button-coffee");
const buttonTea = document.querySelector("#button-tea");
const buttonDessert = document.querySelector("#button-dessert");

const buttonIcons = document.querySelectorAll(".offer__icon");

const buttonSize = document.querySelectorAll(".btn-size");

//upload json file
function loadProductsData() {
  fetch(
    "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/coffee-house/products.json"
  )
    .then((response) => response.json())
    .then((data) => {
      productsData = data;
      updateCards(productsData, "coffee");
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });

  updateCardVisibility();
}

loadProductsData();

//upload card
function updateCards(data, category) {
  const catalog = document.querySelector(".catalog");
  catalog.innerHTML = "";

  data.forEach((item) => {
    if (item.category === category) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <div class="card__box">
            <img class="card__image" src="img/${item.name}.jpg" alt="${item.name}">
          </div>
          <div class="card__text">
            <div class="card__name">
              <h3 class="h3 coffee__name">${item.name}</h3>
              <p class="coffee__description p">${item.description}</p>
            </div>
            <p class="h3 coffee__price">$${item.price}</p>
          </div>
        `;
      catalog.appendChild(card);
    }
  });
  updateCardVisibility();

  // button for open modal window
  const allCards = document.querySelectorAll(".card");
  console.log(allCards);
  allCards.forEach((card) => {
    card.addEventListener("click", function () {
      const modal = document.querySelector(".modal");
      modal.style.display = "flex";
      showModal(this);
    });
  });
}
// Button Upload More
function updateCardVisibility() {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const maxVisibleCards = mediaQuery.matches ? 4 : 8;
  const allCards = document.querySelectorAll(".card");
  const buttonUploadMore = document.querySelector(".button-refresh");

  allCards.forEach((card, index) => {
    card.classList.toggle("hide", index >= maxVisibleCards);
  });

  buttonUploadMore.style.display =
    allCards.length > maxVisibleCards ? "flex" : "none";
}

window.addEventListener("resize", updateCardVisibility);

const buttonUploadMore = document.querySelector(".button-refresh");
buttonUploadMore.addEventListener("click", function () {
  document
    .querySelectorAll(".card.hide")
    .forEach((card) => card.classList.remove("hide"));
  this.style.display = "none";
});

//show modal
function showModal(cardElement) {
  const modal = document.querySelector(".modal");
  const itemName = cardElement.querySelector(".coffee__name").textContent;

  modal.innerHTML = "";
  productsData.forEach((item) => {
    if (item.name === itemName) {
      const sectionModal = document.createElement("div");
      const body = document.body;

      priceCoffe = parseFloat(item.price).toFixed(2);
      sectionModal.classList.add("modal__container");
      body.classList.add("no-scroll");
      sectionModal.innerHTML = `
      <div class="modal__box">
        <img class="modal__image" src="img/${item.name}.jpg" alt="${item.name}">
      </div>
      <div class="modal__text">
        <div class="modal__name">
          <h3 class="h3">${item.name}</h3>
          <p class="p">${item.description}</p>
        </div>
        <div class="modal__list">
          <p>Size</p>
          <div class="modal__btn">
            <button class="button button-type btn-size btn-size--active" data-size="s" id="small-size">
              <p class="button-type__icon"> S </p>
              <span class="p p-bold button-type__text ">${item.sizes.s.size}</span>
            </button>
            <button class="button button-type btn-size" data-size="m" id="medium-size">
              <p class="button-type__icon"> M </p>
              <span class="p p-bold button-type__text ">${item.sizes.m.size}</span>
            </button>
            <button class="button button-type btn-size" data-size="l" id="large-size">
              <p class="button-type__icon"> L </p>
              <span class="p p-bold button-type__text">${item.sizes.l.size}</span>
            </button>
          </div>
        </div>

        <div class="modal__list">
          <p>Additives</p>
          <div class="modal__btn">
            <button class="button button-type btn-add" id="firstAdd">
              <p class="button-type__icon">1</p>
              <span class="p p-bold button-type__text ">${item.additives[0].name}</span>
            </button>
            <button class="button button-type btn-add" id="secondAdd">
              <p class="button-type__icon">2</p>
              <span class="p p-bold button-type__text ">${item.additives[1].name}</span>
            </button>
            <button class="button button-type btn-add" id="thirdAdd">
              <p class="button-type__icon">3</p>
              <span class="p p-bold button-type__text ">${item.additives[2].name}</span>
            </button>
          </div>
        </div>

        <div class="modal__price">
          <h3 class="h3">Total:</h3>
          <p class="h3 item__price">$${priceCoffe}</p>
        </div>

        <div class="modal__disclaimer">
          <img src="img/icon/info-empty.svg" alt="disclaimer-icon">
          <p class="p-bold">The cost is not final. Download our mobile app to see the final price and place your order.
            Earn
            loyalty points and
            enjoy your favorite coffee with up to 20% discount.</p>
        </div>

        <button class="button modal__btn-close p p-bold">
          Close
        </button>
      </div>
        `;
      modal.appendChild(sectionModal);

      //button choose size
      const buttonSize = document.querySelectorAll(".btn-size");
      const buttonAdd = document.querySelectorAll(".btn-add");

      buttonSize.forEach((button) => {
        button.addEventListener("click", function () {
          buttonSize.forEach((button) => {
            button.classList.remove("btn-size--active");
          });
          button.classList.add("btn-size--active");

          selectedSize = button.getAttribute("data-size");
          getTotal(item);

          document.querySelector(".item__price").textContent = `$${totalPrice}`;
        });
      });

      //button choose add
      selectedAdd = [];
      buttonAdd.forEach((button, index) => {
        button.addEventListener("click", function () {
          button.classList.toggle("btn-add--active");
          if (selectedAdd.includes(index)) {
            selectedAdd = selectedAdd.filter((i) => i !== index);
          } else {
            selectedAdd.push(index);
          }
          getTotal(item);
          document.querySelector(".item__price").textContent = `$${totalPrice}`;
        });
      });
    }
  });

  // button close modal window
  const closeButton = modal.querySelector(".modal__btn-close");

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      body.classList.remove("no-scroll");
    }
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    body.classList.remove("no-scroll");
  });
}

//get total price
function getTotal(item) {
  priceSize = parseFloat(item.sizes[selectedSize]["add-price"]);
  console.log("цена за размер: $" + priceSize);

  priceCoffe = parseFloat(item.price);
  console.log("цена за кофе: $" + priceCoffe);

  priceAdd = 0;

  if (selectedAdd.length > 0) {
    priceAdd = 0.5 * selectedAdd.length;
  }

  console.log("цена за доп: $" + priceAdd);

  totalPrice = (priceCoffe + priceSize + priceAdd).toFixed(2);
}
//click on category button
function handleButtonClick(category) {
  buttonsType.forEach((button) =>
    button.classList.remove("button-type--active")
  );

  document
    .querySelector(`#button-${category}`)
    .classList.toggle("button-type--active");

  updateCards(productsData, category);
}

buttonCoffee.addEventListener("click", () => handleButtonClick("coffee"));

buttonTea.addEventListener("click", () => handleButtonClick("tea"));

buttonDessert.addEventListener("click", () => handleButtonClick("dessert"));
