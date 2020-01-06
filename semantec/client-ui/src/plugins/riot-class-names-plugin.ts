import { install } from 'riot'

/* eslint-disable @typescript-eslint/no-explicit-any */
function classNames(classes: any): any {

  return Object.entries(classes).reduce((acc: any, item: any) => {
    const [key, value] = item

    if (value) return [...acc, key]

    return acc
  }, []).join(' ')
}

install(function (component) {
  component.classNames = classNames

  return component
})