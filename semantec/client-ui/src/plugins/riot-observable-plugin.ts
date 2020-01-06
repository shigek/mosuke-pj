import observable from 'riot-observable'
import { install } from 'riot'

const obs = observable()
install(function (component) {
  component.obs = obs

  return component
})
