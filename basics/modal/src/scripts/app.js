/** global: widgets*/
window.onload = function () {
    "use strict";

    var elt = document.querySelector("#modal");
    var modal = new Modal(elt);
    var button = document.querySelector(".button");
    button.addEventListener("click", function () {
        modal.show();
    });

    var submit = document.querySelector(".submit");
};
