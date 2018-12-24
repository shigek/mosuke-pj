"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riot_1 = __importDefault(require("riot"));
const Validator = require('validatorjs-riot');
exports.validationMixin = {
    validator: {
        validation(tags) {
            Validator.useLang('ja');
            let errors = {};
            for (let k in tags) {
                const validation = new Validator(tags[k].refs);
                if (validation.fails()) {
                    Object.assign(errors, validation.errors.all());
                }
            }
            return errors;
        },
        fails(errors) {
            return Object.keys(errors).length !== 0;
        },
        alert(tags, errors) {
            for (let k in errors) {
                const child = tags[$('#' + k).prop('tagName').toLowerCase()];
                child.refs[k + '_span'].innerText = errors[k][0];
            }
        }
    }
};
riot_1.default.mixin('validator', exports.validationMixin);
