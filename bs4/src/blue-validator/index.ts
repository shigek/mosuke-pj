
import riot from 'riot';
import Validator from '../validaotrs-riot';
import $ from 'jquery';

//mixin
interface ValidatorMixIn extends riot.TagMixin {
  validator: {
    validation(tags: any): any;
    fails(errors: any): any;
    alert(tags: any, errors: any): void;
    clear(tags: any): void;
  }
}
export const validationMixin: ValidatorMixIn = {
  validator: {
    validation(tags: any) {
      this.clear(tags);
      Validator.useLang('ja');
      let errors = {};
      for (let k in tags) {
        if (Array.isArray(tags[k])) {
          for (let n in tags[k]) {
            const validation = new Validator(tags[k][n].refs);
            if (validation.fails()) {
              Object.assign(errors, validation.errors.all());
            }
          }
        } else {
          const validation = new Validator(tags[k].refs);
          if (validation.fails()) {
            Object.assign(errors, validation.errors.all());
          }
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
        if (Array.isArray(child)) {
          for (let n in child) {
            if (child[n].ref === k) {
              child[n].refs[k + '_span'].innerText = errors[k][0];
              break;
            }
          }
        } else {
          child.refs[k + '_span'].innerText = errors[k][0];
        }
      }
    },
    clear(tags: any): void {
      for (let k in tags) {
        const child = tags[k];
        if (Array.isArray(tags[k])) {
          for (let n in tags[k]) {
            child[n].refs[child[n].ref + '_span'].innerText = '';
          }
        } else {
          child.refs[child.ref + '_span'].innerText = '';
        }
      }
    }
  }
}
riot.mixin('validator', validationMixin);
