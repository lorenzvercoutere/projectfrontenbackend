/**
 * Created by lorenzvercoutere on 17/01/17.
 */

var MouseGame = function (mousePosX, mousePosY) {
    var mousePosX,
        mousePosY;
    var mouseover = function (e) {
        var that = this;
        that.mousePosX = e.clientX;
        that.mousePosY = e.clientY;
    };

    return{
        mousePosX: mousePosX,
        mousePosY: mousePosY
    };
};

module.exports = MouseGame;