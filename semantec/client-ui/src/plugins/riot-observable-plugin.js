import observable from 'riot-observable'
import riot from 'riot'

riot.install(function(component) {
  component.styleAttribute = observable

  return component
})
