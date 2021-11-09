import { RightThingModel } from '../models'

const RightThing = () => {
  const createRightThing = async (rightThing) => await RightThingModel.create(rightThing)
  const deleteRightThing = async (query) => await RightThingModel.deleteOne(query)
  const getRightThing = async (query) => await RightThingModel.findOne(query)
  const countRightThing = async (query) => await RightThingModel.countDocuments(query)

  return {
    createRightThing,
    deleteRightThing,
    getRightThing,
    countRightThing
  }
}

export default RightThing
