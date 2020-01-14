import { register, RiotComponentShell } from 'riot'

/* eslint-disable @typescript-eslint/no-explicit-any*/
export function registerClass(element: Function, tagTemplate: RiotComponentShell): void {

  function registerTag(component: RiotComponentShell): any {
    const clazz: any = element
    const instance = new clazz()
    const foo = Object.assign({ exports: { __proto__: instance.__proto__ } }, instance)
    const registered = register(component.name || '', Object.assign(component, foo))
    element.prototype.update = (registered.get(component.name || '') as any).update
    return component.name
  }

  element.prototype.tagName = registerTag(tagTemplate)
}

export function template(template: RiotComponentShell) {
  return function (target: Function): any {
    registerClass(target, template)
  }
}
