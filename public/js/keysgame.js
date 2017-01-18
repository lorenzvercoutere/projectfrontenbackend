/**
 * Created by lorenzvercoutere on 17/01/17.
 */

var keysGame = (function () {
    var up = false, left = false, right = false, down = false;

    var onKeyDown = function(e) {
        var that = this,
            c = e.keyCode;
        switch (c) {
            // Controls
            case 37: // Left
                that.left = true;
                break;
            case 38: // Up
                that.up = true;
                break;
            case 39: // Right
                that.right = true; // Will take priority over the left key
                break;
            case 40: // Down
                that.down = true;
                break;
            case 81: // Left
                that.left = true;
                break;
            case 90: // Up
                that.up = true;
                break;
            case 68: // Right
                that.right = true; // Will take priority over the left key
                break;
            case 83: // Down
                that.down = true;
                break;
        }
    };

    var onKeyUp = function(e) {
        var that = this,
            c = e.keyCode;
        switch (c) {
            case 37: // Left
                that.left = false;
                break;
            case 38: // Up
                that.up = false;
                break;
            case 39: // Right
                that.right = false;
                break;
            case 40: // Down
                that.down = false;
                break;
            case 81: // Left
                that.left = false;
                break;
            case 90: // Up
                that.up = false;
                break;
            case 68: // Right
                that.right = false;
                break;
            case 83: // Down
                that.down = false;
                break;
        }
    };

    return {
        up: up,
        left: left,
        right: right,
        down: down,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp
    };
})();

module.exports = keysGame;