/**
 * Created by lorenzvercoutere on 15/11/16.
 */


(function () {

    var button;

    init();
    addEvent();

    function init() {
        button = document.getElementById("btn");
    }

    function addEvent() {
        button.addEventListener("click", showAlert);
    }

    function showAlert() {
        alert("Hello World!");
    }



})();