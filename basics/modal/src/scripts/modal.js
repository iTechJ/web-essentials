(function (global) {
    "use strict";

    /** modal function
     *
     *
     */
    global.Modal = function (elt, userSettings) {
        if (!elt) throw "please, specify element";

        var defaults = {
            closeOnEscape: true,
            closeOnClickOutside: true
        };

        this.elt = elt;
        this.hide();

        this.settings = userSettings ? merge(defaults, userSettings) : defaults;
        this.__subscribe();
    };

    global.Modal.prototype.__subscribe = function () {
        var widget = this;
        if (this.settings.closeOnEscape) {
            document.addEventListener("keyup", function (e) {
                if (e.code === "Escape") {
                    widget.hide();
                }
            });
        }

        if (this.settings.closeOnClickOutside) {
            document.addEventListener("click", function (e) {
                var target = e.target;
                if (target && target.id === "fade") {
                    widget.hide();
                }
            })
        }

        this.elt.querySelectorAll("[data-role = close]").forEach(function (button) {
            button.addEventListener("click", function () {
                widget.hide();
            });
        })
    };

    global.Modal.prototype.show = function () {
        showFade();
        this.elt.style.display = "block";
    };

    global.Modal.prototype.hide = function () {
        hideFade();
        this.elt.style.display = "none";
    };

    function showFade() {
        var box = document.createElement("div");
        box.classList.add("fade");
        box.setAttribute("id", "fade");
        document.body.appendChild(box);
    }

    function hideFade() {
        var box = document.getElementById("fade");
        if (box) {
            box.parentNode.removeChild(box);
        }
    }

    function merge(defaults, settings) {
        var mergedObject = {};
        for (var property in defaults) {
            if (defaults.hasOwnProperty(property)) {
                mergedObject[property] = settings[property] ? settings[property] : defaults[property];
            }
        }

        return mergedObject;
    }

}(window));