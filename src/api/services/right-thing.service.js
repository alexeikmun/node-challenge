import { RightThingModel } from '../models'

const RightThing = () => {
  const createRightThing = async (rightThing) => await RightThingModel.create(rightThing)
  const getRightThing = async (query) => await RightThingModel.findOne(query)
  const countRightThing = async (query) => await RightThingModel.countDocuments(query)

  return {
    createRightThing,
    getRightThing,
    countRightThing
  }
}

export default RightThing
