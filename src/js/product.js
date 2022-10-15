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
};

// render product
$(function () {
  const productTemplate = $("#product-pr").html();
  const product = _.template(productTemplate); // compile

  $(".list-fruit-product").append(
    _.map(products, (pr) => {
      const dom = $(product(pr));

      dom.find(".btn-add").on("click", pr, addToCart);

      return dom;
    })
  );
});
