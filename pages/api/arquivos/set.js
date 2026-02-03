import NextAuth from '@/api/auth/[...nextauth].js'
import admin from '@/lib/backEnd/firebase.ts'
import { unstable_getServerSession } from 'next-auth/next'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const { email, nome } = req.body
    const error = 'Não foi possível cadastrar a pasta. Reinicie o seu navegador e tente novamente.'

    if (email) {

      const logado = await unstable_getServerSession(req, res, NextAuth)

      if (logado) {
        const user = admin.firestore().collection('usuarios').doc(email).collection('pastas')

        const verificando = async () => {
          const uid_folder = Math.random().toString(36).slice(2)

          await user.where('uid_folder', '==', uid_folder).get().then(q => {
            if (q.empty) {
              user.add({
                uid_folder,
                nome,
                data: admin.firestore.FieldValue.serverTimestamp()
              }).then(() => {
                return res.status(200).json({ uid_folder })
              }).catch(() => {
                return res.status(200).json({ error })
              })
            } else {
              verificando()
            }
          }).catch(() => {
            return res.status(200).json({ error })
          })
        }

        verificando()

      } else {
        return res.status(200).json({ error: 'Unauthorized' })
      }
    } else {
      return res.status(200).json({ error: 'Bad Request' })
    }

  }
}
