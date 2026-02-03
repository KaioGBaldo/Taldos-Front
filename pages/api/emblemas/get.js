import NextAuth from '@/api/auth/[...nextauth].js'
import admin from '@/lib/backEnd/firebase.ts'
import { unstable_getServerSession } from 'next-auth/next'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const email = req.body.email

    if (email) {

      const logado = await unstable_getServerSession(req, res, NextAuth)

      if (logado) {
        const user = admin.firestore().collection('usuarios').doc(email)

        const conquistas = await user.collection('conquistas').get()
        const data = conquistas.docs.map(doc => {
          return {
            id: doc.id,
            id_conquista: doc.data().id,
            data: doc.data().data
          }
        })
        return res.status(200).json(data)
      } else {
        return res.status(200).json({ error: 'Unauthorized' })
      }
    } else {
      return res.status(200).json({ error: 'Bad Request' })
    }

  }
}
