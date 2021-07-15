"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resta = /** @class */ (function () {
    function Resta(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    Resta.prototype.resultado = function () {
        return this.num1 - this.num2;
    };
    return Resta;
}());
exports.default = Resta;
