const AuthService = () => {
  const getToken = (authorization) =>
    (authorization && authorization.split(' ')[0] === 'Bearer')
      ? authorization.split(' ')[1]
      : null

  const getUserInfo = async (auth, token) => await auth.auth().verifyIdToken(token)

  return {
    getToken,
    getUserInfo
  }
}

export default AuthService
