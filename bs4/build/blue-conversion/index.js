"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riot_1 = __importDefault(require("riot"));
exports.conversionMixin = {
    conversion: {
        toBoolean(data) {
            const test = data || 'false';
            return test.toLowerCase() === 'true';
        },
        toDateFormat(str, delimiter) {
            return str.substr(0, 4) + delimiter + str.substr(4, 2) + delimiter + str.substr(6, 2);
        },
        contains(str, key) {
            return str.indexOf(key) !== -1;
        }
    }
};
riot_1.default.mixin('conversion', exports.conversionMixin);
