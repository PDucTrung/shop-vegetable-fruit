import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "hover.css/css/hover.css";
import "animate.css/animate.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";
import "aos/dist/aos.css";
import _ from "lodash";
import AOS from "aos";
import { Validator } from "./validator";
import "../css/index.css";
import "../css/global.css";
import "../css/product.css";
import "../css/cart.css";
import "../css/checkout.css";
import "../css/productdetail.css";
import "../css/about.css";
import "../css/blog.css";
import "../css/blogdetail.css";
import "../css/contact.css";

// Page loader //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(window).on("load", function () {
  $(".preloader").fadeOut(2000);
});

// hide page header //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".page-header").style.top = "0";
  } else {
    document.querySelector(".page-header").style.top = "-62.2px";
  }
  prevScrollpos = currentScrollPos;
};

// modal1 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let modal = document.getElementById("userModal");

let btn = document.getElementById("userBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// modal2 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let modal2 = document.getElementById("regModal");

let btn2 = document.getElementById("regBtn");

let span2 = document.getElementsByClassName("close2")[0];

btn2.onclick = function () {
  modal.style.display = "none";
  modal2.style.display = "block";
};

span2.onclick = function () {
  modal2.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

// modal3 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let modal3 = document.getElementById("searchModal");

let btn3 = document.getElementById("searchBtn");

let span3 = document.getElementsByClassName("close3")[0];

btn3.onclick = function () {
  modal3.style.display = "block";
};

span3.onclick = function () {
  modal3.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
};

// modal4 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let modal4 = document.getElementById("menuModal");

let btn4 = document.getElementById("menuBtn");

let span4 = document.getElementsByClassName("close4")[0];

btn4.onclick = function () {
  modal4.style.display = "block";
};

span4.onclick = function () {
  modal4.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
};

// slider ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let $slider_ini = $(".Advance-Slider");
let total_slide = 0;
$slider_ini.on("init", function (event, slick, currentSlide, nextSlide) {
  $("button.slick-arrow").append('<div class="thumb"></div>');
  total_slide = slick.slideCount;
  console.log(total_slide);
  let next_img = $(slick.$slides[1]).find("img").attr("src");
  let prev_img = $(slick.$slides[total_slide - 1])
    .find("img")
    .attr("src");
  $("button.slick-next .thumb").append('<img src="' + next_img + '">');
  $("button.slick-prev .thumb").append('<img src="' + prev_img + '">');
});
$slider_ini.slick({
  autoplay: true,
  autoplaySpeed: 3000,
  // speed: 1000,
  slidesToShow: 1,
  cssEase: "linear",
  slidesToScroll: 1,
  dots: true,
  pauseOnHover: false,
  infinite: true,
  customPaging: function (slider, i) {
    var thumb = $(slider.$slides[i]).find(".dots-img").attr("src");
    console.log(thumb);
    return (
      '<button><div class="mextrix"><a><img src="' +
      thumb +
      '"></a></div></button>'
    );
  },
});

$("button.slick-arrow , .Advance-Slider ul.slick-dots li button").hover(
  function () {
    $(this).addClass("hover-in");
    $(this).removeClass("hover-out");
  },
  function () {
    $(this).removeClass("hover-in");
    $(this).addClass("hover-out");
  }
);

$slider_ini.on("afterChange", function (event, slick, currentSlide) {
  console.log("afterChange: " + currentSlide);

  let prev_img = $(slick.$slides[currentSlide - 1])
    .find("img")
    .attr("src");
  let next_img = $(slick.$slides[currentSlide + 1])
    .find("img")
    .attr("src");

  if (currentSlide == total_slide) {
    prev_img = $(currentSlide - 1)
      .find("img")
      .attr("src");
  }

  if (currentSlide == 0) {
    console.log("if call");
    prev_img = $(slick.$slides[total_slide - 1])
      .find("img")
      .attr("src");
  }

  if (currentSlide == total_slide - 1) {
    next_img = $(slick.$slides[0]).find("img").attr("src");
  }

  $("button.slick-arrow ").find("img").remove();

  $("button.slick-next .thumb").append('<img src="' + next_img + '">');
  $("button.slick-prev .thumb").append('<img src="' + prev_img + '">');
});

// timedown ///////////////////////////////////////////////////////////////////////////////////////////////
if (
  window.document.location.pathname == "/index.html" ||
  window.document.location.pathname == "/"
) {
  let countDownDate = new Date("october 30, 2022 23:59:59").getTime();

  setInterval(function () {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timedown").innerHTML =
      days +
      "d " +
      " : " +
      hours +
      "h " +
      " : " +
      minutes +
      "m " +
      " : " +
      seconds +
      "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timedown").innerHTML = "End Deal";
      document.getElementById("timedown2").innerHTML = "End Deal";
      document.getElementById("days").innerHTML = "End Deal";
      document.getElementById("hours").innerHTML = "End Deal";
      document.getElementById("minutes").innerHTML = "End Deal";
      document.getElementById("seconds").innerHTML = "End Deal";
    }

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    document.getElementById("timedown2").innerHTML =
      days +
      "d " +
      " : " +
      hours +
      "h " +
      " : " +
      minutes +
      "m " +
      " : " +
      seconds +
      "s ";
  }, 1000);
}

//count

if (
  window.document.location.pathname == "/index.html" ||
  window.document.location.pathname == "/"
) {
  let a = 0;
  $(window).scroll(function () {
    let oTop = $("#counter").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $(".counter").each(function () {
        let $this = $(this),
          countTo = $this.attr("number");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
      a = 1;
    }
  });
}

// aos
AOS.init({
  offset: 200,
  duration: 300,
  once: true,
});

// slider about ////////////////////////////////////////////////////////
$(".slider-home").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  dots: true,
  fade: true,
  cssEase: "linear",
});

// slider partner ////////////////////////////////////////////////////////
$(".slider-partners").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
});

// filter range ////////////////////////////////////////////////////////////////////////////////////////////////////

if (window.document.location.pathname === "/product.html") {
  var lowerSlider = document.querySelector("#lower");
  var upperSlider = document.querySelector("#upper");

  document.querySelector("#two").value = upperSlider.value;
  document.querySelector("#one").value = lowerSlider.value;

  var lowerVal = parseInt(lowerSlider.value);
  var upperVal = parseInt(upperSlider.value);

  upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);

    if (upperVal < lowerVal + 4) {
      lowerSlider.value = upperVal - 4;
      if (lowerVal == lowerSlider.min) {
        upperSlider.value = 4;
      }
    }
    document.querySelector("#two").value = this.value;
  };

  lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (lowerVal > upperVal - 4) {
      upperSlider.value = lowerVal + 4;
      if (upperVal == upperSlider.max) {
        lowerSlider.value = parseInt(upperSlider.max) - 4;
      }
    }
    document.querySelector("#one").value = this.value;
  };
}

// check payment block
if (window.document.location.pathname == "/checkout.html") {
  $("#check-pay").change(function () {
    if ($(this).is(":checked")) {
      $(".content-check").removeClass("check-none");
      $(".content-check").addClass("check-block");
      //
      $("#check-pay2").prop("checked", false);
      $("#check-pay3").prop("checked", false);
      $(".content-check2").addClass("check-none");
      $(".content-check3").addClass("check-none");
      $(".content-check2").removeClass("check-block");
      $(".content-check3").removeClass("check-block");
    } else {
      $(".content-check").addClass("check-none");
      $(".content-check").removeClass("check-block");
    }
  });

  $("#check-pay2").change(function () {
    if ($(this).is(":checked")) {
      $(".content-check2").removeClass("check-none");
      $(".content-check2").addClass("check-block");
      //
      $("#check-pay").prop("checked", false);
      $("#check-pay3").prop("checked", false);
      $(".content-check").addClass("check-none");
      $(".content-check3").addClass("check-none");
      $(".content-check").removeClass("check-block");
      $(".content-check3").removeClass("check-block");
    } else {
      $(".content-check2").addClass("check-none");
      $(".content-check2").removeClass("check-block");
    }
  });

  $("#check-pay3").change(function () {
    if ($(this).is(":checked")) {
      $(".content-check3").removeClass("check-none");
      $(".content-check3").addClass("check-block");
      //
      $("#check-pay").prop("checked", false);
      $("#check-pay2").prop("checked", false);
      $(".content-check").addClass("check-none");
      $(".content-check2").addClass("check-none");
      $(".content-check").removeClass("check-block");
      $(".content-check2").removeClass("check-block");
    } else {
      $(".content-check3").addClass("check-none");
      $(".content-check3").removeClass("check-block");
    }
  });
}

// slider detail product
$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-nav",
});
$(".slider-nav").slick({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1500,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  focusOnSelect: true,
  arrows: false,
  dots: false,
});

// slider product relative /////////////////////////////////////////////////////

$(".related-product-slider").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
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

// slider history ////////////////////////////////////////////////////////
$(".slider-history").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
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

// slider team /////////////////////////////////////////////////////////////////////
$(".slider-team").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  cssEase: "linear",
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
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

// slider blog /////////////////////////////////////////////////////////////////////
$(".slider-list-blog").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  speed: 1000,
  cssEase: "linear",
  arrows: false,
  dots: true,
});

// Toast function
if (
  window.document.location.pathname == "/checkout.html" ||
  window.document.location.pathname == "/product.html"
) {
  const toasts = document.getElementById("toasts");

  $(".checkout").on("click", () => createNotification());

  function createNotification() {
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerHTML = `<div>
      <div><span><i class="text-green bi bi-bag-check"></i></span> Success</div>
      <div class="delete-icon"><i class="bi bi-x"></i></div>
    </div>`;

    toasts.appendChild(notif);

    setTimeout(() => {
      notif.remove();
    }, 3000);
  }
}

// call api

// validator form ///////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  Validator({
    form: "#form-1",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#fullname", "Please enter your full name"),
      Validator.isRequired("#email"),
      Validator.isEmail("#email"),
      Validator.isRequired("#password"),
      Validator.minLength("#password", 8),
      Validator.isPasstext("#password"),
      Validator.isRequired("#password_confirmation"),
      Validator.isConfirmed(
        "#password_confirmation",
        function () {
          return document.querySelector("#form-1 #password").value;
        },
        "Re-enter unknown password correctly"
      ),
    ],
  });

  Validator({
    form: "#form-2",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#email"),
      Validator.isEmail("#email"),
      Validator.isRequired("#password"),
      Validator.minLength("#password", 8),
      Validator.isPasstext("#password"),
    ],
  });

  Validator({
    form: "#form-3",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [Validator.isRequired("#email"), Validator.isEmail("#email")],
    onSubmit: function (data) {
      console.log(data);
    },
  });

  Validator({
    form: "#form-4",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#firstname"),
      Validator.isRequired("#lastname"),
      Validator.isRequired("#phone"),
      Validator.isPhone("#phone"),
      Validator.isRequired("#city"),
      Validator.isRequired("#district"),
      Validator.isRequired("#address"),
      Validator.isRequired("#email"),
      Validator.isEmail("#email"),
    ],
    onSubmit: function (data) {
      console.log(data);
    },
  });

  Validator({
    form: "#form-5",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#fullname"),
      Validator.isRequired("#email"),
      Validator.isEmail("#email"),
    ],
    onSubmit: function (data) {
      console.log(data);
    },
  });
});

// sign in

var signUp = document.getElementById("sign-up");
signUp.addEventListener("click", (e) => signup(e.preventDefault()));
function signup() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  let fullname = document.querySelector('input[name="fullname2"]');
  let email = document.querySelector('input[name="email2"]');
  let password = document.querySelector('input[name="password2"]');
  const user = {
    fullname: fullname.value,
    email: email.value,
    password: password.value,
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Your account has been created");
  document.getElementById("regModal").style.display = "none";
}

// checking
var signIn = document.getElementById("sign-in");
signIn.addEventListener("click", (e) => signin(e.preventDefault()));
function signin() {
  let users = JSON.parse(localStorage.getItem("users"));
  let userEmail = document.querySelector('input[name="email3"]');
  let userPw = document.querySelector('input[name="password3"]');
  let check = false;
  for (let i = 0; i < users.length; i++) {
    if (
      userEmail.value == users[i].email &&
      userPw.value == users[i].password
    ) {
      check = true;
    }
  }
  if (check == true) {
    alert("Successful login  \n\nWellcome to Tfruit shop");
    document.getElementById("userModal").style.display = "none";
  } else {
    alert("you have failed to login");
  }
}

// cout cart

$(function () {
  let cart = JSON.parse(localStorage.getItem("carts")) || [];

  $(".number").text(cart.length);
});
