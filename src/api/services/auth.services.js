
const AuthService = () => {
  const getToken = (authorization) =>
    (authorization && authorization.split(' ')[0] === 'Bearer')
      ? authorization.split(' ')[1]
      : null

  const getUserInfo = async (auth, token) => await auth.auth().verifyIdToken(token)
  const createToken = async (auth, authId) => await auth.auth().createCustomToken(authId)
  const createUser = async (auth, email, password) => await auth.auth().createUser({
    email,
    password
  })
  const getUserByEmail = async (auth, email) => await auth.auth().getUserByEmail(email)

  const deleteUserByEmail = async (auth, email) => {
    const user = await getUserByEmail(auth, email)
    return await auth.auth().deleteUser(user.uid)
  }

  return {
    getToken,
    getUserInfo,
    createToken,
    createUser,
    getUserByEmail,
    deleteUserByEmail
  }
}

export default AuthService
