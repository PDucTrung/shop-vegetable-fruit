import $, { event } from "jquery";
import _ from "lodash";

import { products } from "./db";

const url = new URL(location.href);
const id = Number(url.searchParams.get("id"));
// const product = _.find(products, { id });
// const cart = JSON.parse(localStorage.getItem("carts")) || [];
// const item = _.find(cart, { product: product.id });

// add to cart
const addToCart = (event) => {
  event.preventDefault();

  const product = _.find(products, { id });

  const cart = JSON.parse(localStorage.getItem("carts")) || [];

  const item = _.find(cart, { product: product.id });

  let input = $(".non").find("input.number-qty").val();

  let total = product.price;

  if (item) {
    alert("! Sản phẩm đã có giỏ hàng");
  } else if (product) {
    alert("Sản phẩm đã được thêm vào giỏ hàng trong giỏ hàng");
    cart.push({
      product: product.id,
      quantity: Number(input),
      total: Number(total * input).toFixed(2),
    });
  }

  localStorage.setItem("carts", JSON.stringify(cart));

  $(".number").text(cart.length);
};

// render product detail
$(function () {
  const product = _.find(products, { id });

  $(".non").html(
    `
            <div class="img-pr-detail">
                <div class="d-flex flex-column gap-3 align-items-center justify-content-center">
                  <div class="img-pr-top"><img src="${product.img}" alt="dsd"></div>
                  <div class="img-pr-bottom d-flex gap-3 align-items-center justify-content-center">
                      <img src="${product.img}" alt="dsd">
                      <img src="https://tfruit.vercel.app/assets/pr-fr-29.fffed05e.jpg" alt="dsd">
                      <img src="https://tfruit.vercel.app/assets/pr-fr-9.961b2d61.png" alt="dsd">
                  </div>
             </div>
            </div>

            <div class="content-pr-detail">
              <div class="tittle-pr-detail">
                <div><p class="font-mali fs-40 fw-500">${product.name}</p></div>
                <div class="d-flex gap-3">
                  <div><span class="font-mali fs-20">$ ${product.price}</span></div>
                  <div
                    class="list-star d-flex justify-content-center align-items-center gap-2"
                  >
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                  </div>
                </div>
                <div>
                  <br />
                  <p>
                    ${product.description}
                  </p>
                </div>
              </div>
              <div class="content-pr-detail">
                <div class="properties-pr-detail">
                  <div>
                    <p>Brand: <span class="text-gray-fo">TFruit</span></p>
                  </div>
                  <div>
                    <p>Category: <span class="text-gray-fo">${product.category}</span></p>
                  </div>
                  <div>
                    <p>Weght: <span class="text-gray-fo">${product.weight}g</span></p>
                  </div>
                </div>
                <div
                  class="quality-pr-detail d-flex align-items-center justify-content-between"
                >
                  <div class="qty-cart">
                    <input
                      class="number-qty"
                      type="number"
                      id="input"
                      readonly
                      value="1"                     
                    />
                    <div
                      class="num-in d-flex flex-column gap-2 align-items-center justify-content-center"
                    >
                      <button class="plus" >
                        <i class="fas fa-plus"></i>
                      </button>
                      <button class="minus">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div class="add-cart-pr-detail">
                    <div id="checkout" class="btn-add button button-2">Add to cart</div>
                  </div>
                </div>
              </div>
            </div>
    `
  );

  $(".non").find(".btn-add").on("click", addToCart);
  $(".non")
    .find(".plus")
    .on("click", function () {
      input.val(parseInt(input.val()) + 1);
    });
  $(".non")
    .find(".minus")
    .on("click", function () {
      if (input.val() > 1) {
        input.val(parseInt(input.val()) - 1);
      }
    });
  let input = $(".non").find("input.number-qty");

  $(".name-pr-detail").text(product.name);

  clickImg();

  const productRelated = _.filter(products, { category: product.category });
  const productTemplate = $("#product-related").html();
  const productCategoty = _.template(productTemplate);
  $(".related-product-slider")
    .append(
      _.map(productRelated, (pr) => {
        const dom = $(productCategoty(pr));

        return dom;
      })
    )
    .slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      cssEase: "linear",
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    });
});

const clickImg = () => {
  const img = $(".img-pr-top img");
  $(".img-pr-bottom")
    .find("img")
    .on("click", (i) => {
      img.attr("src", i.target.src);
    });
};
