/**
 * Created by Mathias on 8-12-2016.
 */

var canvas = document.getElementById("gameCanvas");
canvas.addEventListener('mouseover', getMousePos(canvas,this));

function getMousePos(canvas, evt) {

    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
