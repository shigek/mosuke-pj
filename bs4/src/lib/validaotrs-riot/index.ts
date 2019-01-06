import Validator = require('validatorjs');

class ValidatorjsRiot extends Validator<any> {

  constructor(refs: any, option?: any) {
    const v: any = super({}, {})
    const data: any = {}

    const rules: any = {}

    const attributeNames: any = {}

    this._option = option || {}

    const fieldName = this._option.field_name || 'ref-label'



    for (const name in refs) {

      if (!refs.hasOwnProperty(name)) {

        continue

      }

      const ref = refs[name]

      let attributes = ref.attributes

      if (!attributes && ref.root) {

        attributes = ref.root.attributes

      }

      if (!this._isTarget(name)) {

        continue

      }

      data[name] = this._prepareData(ref.value, attributes.type)

      rules[name] = this._prepareRule(attributes)

      if (attributes[fieldName]) {

        attributeNames[name] = attributes[fieldName].nodeValue

      }

    }
    const vv = new Validator({}, rules)

    v.input = data

    v.setAttributeNames(attributeNames)

    v.rules = vv.rules
  }

  _option: any

  _prepareData(value: any, type: any) {

    if (!value) {

      return value

    }

    if (type && type.nodeValue == "number") {

      return parseFloat(value)

    }

    return value

  }



  _prepareRule(attributes: any) {

    const rule: any = []

    if (attributes.validate && attributes.validate.nodeValue) {

      const value = attributes.validate.nodeValue

      if (value.indexOf('|') >= 0) {

        Array.prototype.push.apply(rule, value.split('|'))

      } else {

        rule.push(value)

      }

    }

    if (attributes.required) {

      rule.push('required')

    }

    if (attributes.min && attributes.min.nodeValue) {

      rule.push(`min:${attributes.min.nodeValue}`)

    }

    if (attributes.max && attributes.max.nodeValue) {

      rule.push(`max:${attributes.max.nodeValue}`)

    }

    if (attributes.pattern && attributes.pattern.nodeValue) {

      rule.push(`regex:${attributes.pattern.nodeValue}`)

    }

    return rule

  }

  _isTarget(ref: any) {

    const target = this._option.target || []

    const except = this._option.except || []

    if (target.length > 0 && target.indexOf(ref) < 0) {

      return false

    }

    if (except.length > 0 && except.indexOf(ref) >= 0) {

      return false

    }

    return true

  }

  static useLang(lang: string) {

    Validator.useLang(lang)

  }

}

export = ValidatorjsRiot;