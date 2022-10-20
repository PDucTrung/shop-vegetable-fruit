import $ from "jquery";
import _ from "lodash";
import { products } from "./db";

// add to cart
const addToCart = (event) => {
  event.preventDefault();

  const cart = JSON.parse(localStorage.getItem("carts")) || [];

  const item = _.find(cart, { product: event.data.id });

  const action = _.find(products, { id: event.data.id });

  let total = action.price;

  if (item) {
    alert("! Sản phẩm đã có giỏ hàng");
  } else {
    alert("Sản phẩm đã được thêm vào giỏ hàng trong giỏ hàng");
    cart.push({
      product: event.data.id,
      quantity: 1,
      total: total,
    });
  }

  localStorage.setItem("carts", JSON.stringify(cart));

  $(".number").text(cart.length);
};


// filter by checkbox
const filter = (event) => {
  const categories = [];
  // categories.length = 0;

  $("input:checked").each(function () {
    categories.push(this.value);
  });

  const filteredProducts = products.filter(
    (p) => categories.length === 0 || categories.includes(p.category)
  );

  render(filteredProducts);
};

// render
const render = (products) => {
  const $listFruit = $(".list-fruit-product");
  const productTemplate = $("#product-pr").html();
  const product = _.template(productTemplate); // compile

  $listFruit.html("");
  $listFruit.append(
    _.map(products, (pr) => {
      const dom = $(product(pr));

      dom.find(".btn-add").on("click", pr, addToCart);

      return dom;
    })
  );
};

$(function () {
  render(products);

  $(".list-category").append(
    _.uniq(products.map(({ category }) => category)).map((c) => {
      const categoryTemplate = $("#category-template").html();
      const template = _.template(categoryTemplate);

      const dom = $(template({ category: c }));

      return dom;
    })
  );

  $("form.title-category").on("change", filter);
});
