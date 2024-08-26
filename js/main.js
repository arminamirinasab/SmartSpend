// Constant variables
const PRODUCT_IMAGE_WIDTH = 72;
const ROUND_PERCENTAGE = 17;
const MAXIMUM_MONEY = 100_000_000_000;

let categorySelected, orderFilter, customerMoney;

window.addEventListener("load", function () {
  let loader = document.querySelector("#loader");
  loader.remove();
  Appearance.setSystemScheme();
  categorySelected = document.querySelectorAll("li.selected")[0].dataset.id;
  orderFilter = document.querySelectorAll("li.selected")[1].dataset.filter;
  customerMoney = document.querySelector("#moneyInput").value;

  let selectItems = document.querySelectorAll(".app-dropdown-list-item");
  selectItems.forEach((element) => {
    element.addEventListener("click", function () {
      updateFilters();
    });
  });
});

function updateFilters() {
  categorySelected = document.querySelectorAll("li.selected")[0].dataset.id;
  orderFilter = document.querySelectorAll("li.selected")[1].dataset.filter;
  fetchProducts(customerMoney);
}
// Fetch products
let filterdProducts = [];
function fetchProducts(money) {
  let productsAvailbleCount = 0;
  document.querySelector("#cards").innerHTML = "";
  if (money < MAXIMUM_MONEY) {
    if (categorySelected === "all") filterdProducts = products;
    else filterdProducts = products.filter((product) => product.category == categorySelected);

    if (orderFilter == "asc") filterdProducts.sort((a, b) => a.price - b.price);
    else if (orderFilter == "desc") filterdProducts.sort((a, b) => b.price - a.price);

    filterdProducts.forEach((element) => {
      let countOfProduct = Math.round(money / element.price);
      if (countOfProduct * element.price - money < (element.price / 100) * ROUND_PERCENTAGE) {
        countOfProduct = Math.round(money / element.price);
      } else {
        countOfProduct = Math.floor(money / element.price);
      }
      if (countOfProduct > 0) {
        productsAvailbleCount++;
        let productButton = document.createElement("button");
        productButton.classList.add("app-btn");
        let productImage = document.createElement("img");
        productImage.src = "./images/" + element.image;
        productImage.width = PRODUCT_IMAGE_WIDTH;
        let productCount = document.createElement("b");
        productCount.innerHTML = countOfProduct + " " + element.unit;
        let productName = document.createElement("p");
        productName.innerHTML = element.name;
        productButton.appendChild(productImage);
        productButton.appendChild(productCount);
        productButton.appendChild(productName);
        document.querySelector("#cards").appendChild(productButton);
      }
    });
  } else {
    document.querySelector("#veryMoneyModal").classList.add("show");
  }
  if (productsAvailbleCount <= 0 && money < MAXIMUM_MONEY) document.querySelector("#noMoneyModal").classList.add("show");
}

function caluclateMoney() {
  customerMoney = document.querySelector("#moneyInput").value;
  fetchProducts(customerMoney);
}
