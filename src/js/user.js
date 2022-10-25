import $ from "jquery";
import _ from "lodash";
import { products } from "./db";

const users = JSON.parse(localStorage.getItem("users"));
const userLogin = _.find(users, { login: true });

$(function () {
  $(".user-acc").html(
    `
        <div class="d-flex flex-column gap-4">
          <div>
            <p class="font-mali fw-500">Full name:</p>
            <input class="name-account" type="text" name="" id="" value="${userLogin.fullname}" disabled/>
          </div>
          <div>
            <p class="font-mali fw-500">Email:</p>
            <input class="email-account" type="text" name="" id="" value="${userLogin.email}" disabled/>
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

  $(".change-pass").on("click", () => {
    userLogin.password = $("input.pass-account").val();
    localStorage.setItem("users", JSON.stringify(users));
  });
});

