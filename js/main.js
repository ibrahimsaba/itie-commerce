let prod = document.querySelector("#prod");

// export let container = JSON.parse(localStorage.getItem("selectPro"));

async function getProducts() {
  let res = await fetch("https://fakestoreapi.com/products");
  let convertRes = await res.json();

  convertRes.forEach((el) => {
    prod.innerHTML += `
      <div class="card m-3 shadow-sm" style="width: 18rem;">
        <img src="${el.image}" class="card-img-top" alt="${el.title}" height="200"/>
        <div class="card-body d-flex flex-column">
          <h3 class="card-title">Price: ${el.price} $</h3>
          <p class="card-text">${el.title}</p>
          <a href="product.html" id="addProd" href="#" class="btn btn-primary mt-auto" onclick="getProduct(${el.id})">Add Product</a>
        </div>
      </div>
    `;
  });
  localStorage.setItem("allProducts", JSON.stringify(convertRes));
}

function getProduct(id) {
  let allProducts = JSON.parse(localStorage.getItem("allProducts"));
  let select = allProducts.find(function (el) {
    return el.id === id;
  });
  let carts = JSON.parse(localStorage.getItem("selectPro")) || [];
  select.quantity = 1;
  carts.push(select);
  localStorage.setItem("selectPro", JSON.stringify(carts));
}

getProducts();
