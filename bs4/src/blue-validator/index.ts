
import riot from 'riot';
const Validator = require('validatorjs-riot');
//mixin
interface ValidatorMixIn extends riot.TagMixin {
  validator: {
    validation(tags: any): any;
    fails(errors: any): any;
    alert(tags: any, errors: any): void;
  }
}
export const validationMixin: ValidatorMixIn = {
  validator: {
    validation(tags: any) {
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
    fails(errors: any) {
      return Object.keys(errors).length !== 0;
    },
    alert(tags: any, errors: any) {
      for (let k in errors) {
        const child = tags[$('#' + k).prop('tagName').toLowerCase()];
        child.refs[k + '_span'].innerText = errors[k][0];
      }
    }
  }
}
riot.mixin('validator', validationMixin);
