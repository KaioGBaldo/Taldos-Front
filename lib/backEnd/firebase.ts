import * as admin from 'firebase-admin'

const key = JSON.parse(process.env.FIREBASE_KEY as string)

try {
  admin.initializeApp({
    credential: admin.credential.cert(key)
  })
} catch (error) { }

export default admin
