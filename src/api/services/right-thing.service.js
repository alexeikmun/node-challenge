import { RightThingModel } from '../models'

const RightThing = () => {
  const createRightThing = async (rightThing) => await RightThingModel.create(rightThing)
  const getRightThing = async (query) => await RightThingModel.findOne(query)

  return {
    createRightThing,
    getRightThing
  }
}

export default RightThing
