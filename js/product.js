let productDetails = JSON.parse(localStorage.getItem("selectPro")) || [];
let showProduct = document.querySelector("#show");
let change = document.querySelectorAll(".change");
let delet = document.querySelector("#delete");
let totalCoast = document.querySelector(".text-success");
let popup = document.querySelector(".popup");
let closepopup = document.querySelectorAll(".close-modal");
let overlay = document.querySelector(".overlay");
let confirm = document.querySelector(".katon");

function displayCarts() {
  showProduct.innerHTML = "";
  for (let i = 0; i < productDetails.length; i++) {
    showProduct.innerHTML += `
                  <tr>
                <td>${productDetails[i].title}</td>
                <td>${productDetails[i].price}$</td>
                <td>
                  <input
                    type="number"
                    class="form-control w-50 change"
                    value="${productDetails[i].quantity}"
                    min="1"
                  />
                </td>
                <td class="coast">${(
                  productDetails[i].price * productDetails[i].quantity
                ).toFixed(2)}$</td>
                <td>
                  <button class="btn btn-sm btn-danger" onclick="removeProduct(${i})">Remove</button>
                </td>
              </tr>
`;
  }
  totalPrice();
  changed();
  disableConfirmBtn();
}
function totalPrice() {
  let total = productDetails.reduce((sum, acc) => {
    return sum + acc.price * acc.quantity;
  }, 0);
  totalCoast.textContent = `${total.toFixed(2)}$`;
}
function removeProduct(i) {
  productDetails.splice(i, 1);
  localStorage.setItem("selectPro", JSON.stringify(productDetails));
  //   location.reload();
  displayCarts();
}

function changed() {
  let coast = document.querySelectorAll(".coast");
  let change = document.querySelectorAll(".change");
  change.forEach((input, i) => {
    input.addEventListener("input", function () {
      productDetails[i].quantity = Number(this.value);
      localStorage.setItem("selectPro", JSON.stringify(productDetails));
      let row = input.closest("tr");
      const coastCell = row.querySelector(".coast");
      coastCell.textContent = `${
        productDetails[i].price * productDetails[i].quantity
      }$`;
      totalPrice();
    });
  });
}

let popupfun = function () {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

let closePopUp = function () {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
};

let checkOut = function () {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
  productDetails = [];
  localStorage.setItem("selectPro", JSON.stringify(productDetails));
  displayCarts();
};

function disableConfirmBtn() {
  if (productDetails.length === 0) {
    confirm.classList.add("disabled");
  } else {
    confirm.classList.remove("disabled");
  }
}
console.log(productDetails);
displayCarts();
