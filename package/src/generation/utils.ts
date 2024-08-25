function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function CamelCase(str: string) {
  return str.split("-").map(capitalize).join(" ")
}

export {
  capitalize,
  CamelCase
}