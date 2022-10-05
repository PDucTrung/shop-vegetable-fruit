import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "hover.css/css/hover.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "animate.css/animate.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";
import "aos/dist/aos.css";
import AOS from "aos";
import { Validator } from "./validator";
import "../css/index.css";
import "../css/global.css";

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
    document.querySelector(".page-header").style.top = "-60px";
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
      Validator.minLength("#password", 6),
      Validator.isRequired("#password_confirmation"),
      Validator.isConfirmed(
        "#password_confirmation",
        function () {
          return document.querySelector("#form-1 #password").value;
        },
        "Re-enter unknown password correctly"
      ),
    ],
    onSubmit: function (data) {
      console.log(data);
    },
  });

  Validator({
    form: "#form-2",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#email"),
      Validator.isEmail("#email"),
      Validator.isRequired("#password"),
      Validator.minLength("#password", 6),
    ],
    onSubmit: function (data) {
      console.log(data);
    },
  });

  Validator({
    form: "#form-3",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#email"),
      Validator.isEmail("#email"),
    ],
    onSubmit: function (data) {
      console.log(data);
    },
  });
});

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
  speed: 1000,
  slidesToShow: 1,
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
  // responsive: [
  //   {
  //     breakpoint: 1200,
  //     settings: {
  //       dots: true,
  //     },
  //   },
  // ],
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
let countDownDate = new Date("october 30, 2022 23:59:59").getTime();

let x = setInterval(function () {
  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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

//count
var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter").each(function () {
      var $this = $(this),
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

// aos
AOS.init({
  offset: 200,
  duration: 1000,
});

// slider home ////////////////////////////////////////////////////////
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
  autoplaySpeed: 2000,
  speed: 1000,
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

