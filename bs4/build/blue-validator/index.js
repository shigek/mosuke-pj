"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riot_1 = __importDefault(require("riot"));
const validaotrs_riot_1 = __importDefault(require("../validaotrs-riot"));
const jquery_1 = __importDefault(require("jquery"));
exports.validationMixin = {
    validator: {
        validation(tags) {
            this.clear(tags);
            validaotrs_riot_1.default.useLang('ja');
            let errors = {};
            for (let k in tags) {
                if (Array.isArray(tags[k])) {
                    for (let n in tags[k]) {
                        const validation = new validaotrs_riot_1.default(tags[k][n].refs);
                        if (validation.fails()) {
                            Object.assign(errors, validation.errors.all());
                        }
                    }
                }
                else {
                    const validation = new validaotrs_riot_1.default(tags[k].refs);
                    if (validation.fails()) {
                        Object.assign(errors, validation.errors.all());
                    }
                }
            }
            return errors;
        },
        fails(errors) {
            return Object.keys(errors).length !== 0;
        },
        alert(tags, errors) {
            for (let k in errors) {
                const child = tags[jquery_1.default('#' + k).prop('tagName').toLowerCase()];
                if (Array.isArray(child)) {
                    for (let n in child) {
                        if (child[n].ref === k) {
                            child[n].refs[k + '_span'].innerText = errors[k][0];
                            break;
                        }
                    }
                }
                else {
                    child.refs[k + '_span'].innerText = errors[k][0];
                }
            }
        },
        clear(tags) {
            for (let k in tags) {
                const child = tags[k];
                if (Array.isArray(tags[k])) {
                    for (let n in tags[k]) {
                        child[n].refs[child[n].ref + '_span'].innerText = '';
                    }
                }
                else {
                    child.refs[child.ref + '_span'].innerText = '';
                }
            }
        }
    }
};
riot_1.default.mixin('validator', exports.validationMixin);
