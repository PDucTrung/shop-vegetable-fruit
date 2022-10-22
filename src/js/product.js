import $ from "jquery";
import _ from "lodash";
import { products } from "./db";

const PRODUCTS_PER_PAGE = 9;

const categories = [];

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

// pagination
const pagination = (current, totalPage, prev, next) => {
  const prevButton = $(`<li class="page-item">
                              <a class="page-link"><i class="bi bi-arrow-left"></i></a>
                          </li>`);
  if (prev === 0) {
    prevButton.addClass("disabled");
  } else {
    prevButton.find("a.page-link").attr("href", "?page=" + prev);
  }

  const nextButton = $(`<li class="page-item">
                              <a class="page-link"><i class="bi bi-arrow-right"></i></a>
                          </li>`);

  if (next > totalPage) {
    nextButton.addClass("disabled");
  } else {
    nextButton.find("a.page-link").attr("href", "?page=" + next);
  }

  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    const btn = $(`<li class="page-item">
                          <a class="page-link">${i}</a>
                      </li>`);

    if (i == current) {
      btn.addClass("disabled");
    } else {
      btn.find("a.page-link").attr("href", "?page=" + i);
    }

    pages.push(btn);
  }

  $(".pagination").html("");
  $(".pagination").append(prevButton, pages, nextButton);
};

// filter by checkbox
const filter = (event) => {
  categories.length = 0;

  $("input:checked").each(function () {
    categories.push(this.value);
  });

  render();
};

// render
const render = () => {
  const $listFruit = $(".list-fruit-product");
  const productTemplate = $("#product-pr").html();
  const product = _.template(productTemplate); // compile

  const filteredProducts = products.filter(
    (p) => categories.length === 0 || categories.includes(p.category)
  );

  const url = new URL(location.href);
  const totalPage = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const current = url.searchParams.get("page") || 1;
  const prev = current - 1;
  const next = +current + 1;

  $listFruit.html("");
  $listFruit.append(
    _.map(
      filteredProducts.slice(
        (current - 1) * PRODUCTS_PER_PAGE,
        current * PRODUCTS_PER_PAGE
      ),
      (pr) => {
        const dom = $(product(pr));

        dom.find(".btn-add").on("click", pr, addToCart);

        return dom;
      }
    )
  );

  pagination(current, totalPage, prev, next);
};

$(function () {
  render();

  $(".list-category").append(
    _.uniq(products.map(({ category }) => category)).map((c) => {
      const categoryTemplate = $("#category-template").html();
      const template = _.template(categoryTemplate);

      const dom = $(template({ category: c }));
      return dom;
    })
  );

  $("form.title-category").on("change", filter);
  // search
  search();
});

const renderName = function (event) {
  const productTemplate = $("#search-name").html();
  const productList = _.template(productTemplate);
  $(".text-to-search").append(
    _.map(event, (pr) => {
      const dom = $(productList(pr));

      return dom;
    })
  );
};

const search = () => {
  $("input.search-box-pr").on("keyup", () => {
    let value = $("input.search-box-pr").val().toString().toUpperCase();
    let obj = {};
    const productName = products.filter((pr) => {
      if (pr.name.toUpperCase().indexOf(value) == -1) {
        $(".text-to-search").html("");
      } else return pr.name.toUpperCase().indexOf(value) > -1;
    });

    if (value == "") {
      $(".text-to-search").html("");
    } else renderName(productName);

    $(".text-to-search")
      .find("li")
      .each(function () {
        var text = $(this).text();
        if (obj[text]) {
          $(this).remove();
        } else {
          obj[text] = true;
        }
      });
  });

  $("input.search-box-pr").on("blur", () => {
    $(".text-to-search").html("");
    $("input.search-box-pr").val("");
  });
};
