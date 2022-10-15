import $ from "jquery";
import _ from "lodash";
import { products } from "./db";

let cart = JSON.parse(localStorage.getItem("carts")) || [];

const deleteItem = (event) => {
  if (confirm("Chắc chắn xóa không?")) {
    cart = _.filter(cart, (item) => item.product !== event.data.product.id);

    localStorage.setItem("carts", JSON.stringify(cart));

    event.target.closest(".product-in-cart").remove();
  }
};

const increment = (event) => {
  const product = _.find(cart, { product: event.data.product.id });

  product.quantity += 1;
  const item = $(event.target.closest(".product-in-cart"));
  item.find(".number-qty").val(product.quantity);

  localStorage.setItem("carts", JSON.stringify(cart));
};

const decrement = (event) => {
  const product = _.find(cart, { product: event.data.product.id });

  if (product.quantity === 1) return;
  else product.quantity -= 1;

  const item = $(event.target.closest(".product-in-cart"));
  item.find(".number-qty").val(product.quantity);

  localStorage.setItem("carts", JSON.stringify(cart));
};

$(function () {
  const items = _.map(_.cloneDeep(cart), (item) => {
    item.product = _.find(products, { id: item.product });

    return item;
  });

  $(".content-cart").prepend(
    _.map(items, (i) => {
      const itemTemplate = $("#item-cart").html();
      const item = _.template(itemTemplate);
      const dom = $(item(i));
      dom.find(".trash").on("click", i, deleteItem);
      dom.find(".btn-up").on("click", i, increment);
      dom.find(".btn-down").on("click", i, decrement);
      return dom;
    })
  );
});
