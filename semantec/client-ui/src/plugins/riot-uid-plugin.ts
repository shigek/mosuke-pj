import { install } from 'riot'

/* eslint-disable fp/no-let */
let index = 0
install(function (component) {
  component.uid = ++index

  return component
})
