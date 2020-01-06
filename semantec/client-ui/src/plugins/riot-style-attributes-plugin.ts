import { install } from 'riot'

/* eslint-disable @typescript-eslint/no-explicit-any */
function styleAttribute(attributes: any): any {

  return Object.entries(attributes).reduce((acc: any, item: any) => {
    const [key, value] = item

    return [...acc, `${key}: ${value}`]

  }, []).join(';')
}

install(function (component) {
  component.styleAttribute = styleAttribute

  return component
})
