import $, { event } from "jquery";
import _ from "lodash";
import { products } from "./db";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const users = JSON.parse(localStorage.getItem("users"));
const userLogin = _.find(users, { login: true });

$(function () {
  $(".user-acc").html(
    `
        <div class="d-flex flex-column gap-4">
          <div class="profile-pic">
          <label class="img-label" for="file">
          <span><i class="bi bi-camera"></i></span>
          <span class="font-mali">Change Image</span>
          </label>
          <input class="choose-img" id="file" type="file"/>
           <img src="${userLogin.img}" id="output"/>
          </div>
          <div>
            <p class="font-mali fw-500">Email:</p>
            <input class="email-account" type="text" name="" id="" value="${userLogin.email}" disabled/>
          </div>
          <div>
            <p class="font-mali fw-500">Phone:</p>
            <input class="phone-account" type="text" name="" id="" value="" />
            </div>
            <div>
            <p class="font-mali fw-500">Bank account number:</p>
            <input class="email-account" type="text" name="" id="" value="" />
            </div>
          <div>
            <p class="font-mali fw-500">Password:</p>
            <div class="d-flex flex-column gap-3">
                <input
                  class="pass-account"
                  type="password"
                  name=""
                  id=""
                  value="${userLogin.password}"
                />
                <button class="change-pass font-mali">Change password</button>
            </div>            
          </div>
        </div>   

    `
  );

  $(".change-pass").on("click", checkPass);

  $(".choose-img").on("change", loadFile);
});

const checkPass = () => {
  const input = document.querySelector("input.pass-account").value;
  console.log(input);
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (regex.test(input) == false) {
    toastr["error"](
      "Password must consist of at least 8 letters and contain at least one uppercase letter, one lowercase letter and one number."
    );
  } else {
    userLogin.password = $("input.pass-account").val();
    localStorage.setItem("users", JSON.stringify(users));
    toastr["success"]("Đổi mật khẩu thành công");
  }
};

// chose img

const loadFile = (event) => {
  let image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
  userLogin.img = image.src;
  localStorage.setItem("users", JSON.stringify(users));
};
