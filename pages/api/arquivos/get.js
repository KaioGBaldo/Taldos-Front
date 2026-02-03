import admin from '@/lib/backEnd/firebase.ts'
import NextAuth from '@/api/auth/[...nextauth].js'
import { unstable_getServerSession } from 'next-auth/next'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const email = req.body.email

    if (email) {

      const logado = await unstable_getServerSession(req, res, NextAuth)

      if (logado) {
        const user = admin.firestore().collection('usuarios').doc(email)

        const arquivos = await user.collection('pastas').orderBy('nome').get()
        const data = arquivos.docs.map(doc => {
          return {
            uid_folder: doc.data().uid_folder,
            nome: doc.data().nome
          }
        })
        return res.status(200).json(data)
      } else {
        return res.status(200).json({ error: 'Bad Request' })
      }
    }

  }
}
