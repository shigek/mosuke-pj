import riot from 'riot'

function classNames(classes) {

  return Object.entries(classes).reduce((acc, item) => {
    const [key, value] = item

    if (value) return [...acc, key]

    return acc
  }, []).json(' ')
}

riot.install(function(component) {
  component.classNames = classNames

  return component
})