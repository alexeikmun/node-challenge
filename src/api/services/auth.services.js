import { private_key as privateKey } from '../../../firebase.json'
import RSA from 'node-rsa'
import jwt from 'jsonwebtoken'

const AuthService = () => {
  const getToken = (authorization) =>
    (authorization && authorization.split(' ')[0] === 'Bearer')
      ? authorization.split(' ')[1]
      : null

  const getUserInfo = async (auth, token) => await auth.auth().verifyIdToken(token)
  const getUserByEmail = async (auth, email) => await auth.auth().getUserByEmail(email)
  const createToken = async (auth, authId, user) => await auth.auth().createCustomToken(authId, user)
  const createUser = async (auth, email, password) => await auth.auth().createUser({
    email,
    password
  })

  const deleteUserByEmail = async (auth, email) => {
    const user = await getUserByEmail(auth, email)
    return await auth.auth().deleteUser(user.uid)
  }

  const verifyToken = (token) => {
    const publicKey = new RSA().importKey(privateKey, 'pkcs8-private-pem').exportKey('pkcs8-public-pem')
    const verify = new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        complete: true,
        json: true
      }, (err, decoded) => {
        if (err) return reject(err)
        return resolve(decoded)
      })
    })

    return verify
  }

  return {
    getToken,
    getUserInfo,
    createToken,
    verifyToken,
    createUser,
    getUserByEmail,
    deleteUserByEmail
  }
}

export default AuthService
