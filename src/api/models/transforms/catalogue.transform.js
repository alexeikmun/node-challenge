const cleanCatalogue = (doc, obj) => {
  const { _id, name, description } = obj

  return {
    id: _id,
    name,
    description
  }
}

// schema options
const catalogueTransform = {
  toJSON: {
    transform: cleanCatalogue
  }
}

export default catalogueTransform
