import riot from 'riot'

function styleAttribute(attributes) {

  return Object.entries(attributes).reduce((acc, item) => {
    const [key, value] = item

    return [...acc, `${key}: ${value}`]
  }, []).json(';')
}

riot.install(function(component) {
  component.styleAttribute = styleAttribute

  return component
})
