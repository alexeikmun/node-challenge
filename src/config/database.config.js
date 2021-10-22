import mongoose from 'mongoose'

const setupDatabase = async (host, port, user, password, database) => {
  // mongodb://localhost:27017/test
  // mongodb://val:psw@localhost:27017/mydb
  return await mongoose.createConnection(`mongodb://${user}:${password}@${host}:${port}/${database}`)
}

export default setupDatabase
