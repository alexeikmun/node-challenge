const AuthService = () => {
  const getToken = (authorization) =>
    (authorization && authorization.split(' ')[0] === 'Bearer')
      ? authorization.split(' ')[1]
      : null

  const getUserInfo = async (auth, token) => await auth.auth().verifyIdToken(token)

  const createUser = async (auth, email, password) => {
    const user = await auth.auth().createUser({ email, password })

    return user
  }

  return {
    getToken,
    getUserInfo,
    createUser
  }
}

export default AuthService
