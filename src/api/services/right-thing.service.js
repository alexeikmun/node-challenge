import { RightThingModel } from '../models'

const RightThing = () => {
  const createRightThing = async (rightThing) => await RightThingModel.create(rightThing)

  return {
    createRightThing
  }
}

export default RightThing
