import admin from '@/lib/backEnd/firebase.ts'
import NextAuth from '@/api/auth/[...nextauth].js'
import { unstable_getServerSession } from 'next-auth/next'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const { email, uid_folder } = req.body

    if (email && uid_folder) {

      const logado = await unstable_getServerSession(req, res, NextAuth)

      if (logado) {
        const pastas = admin.firestore().collection('usuarios').doc(email).collection('pastas')

        const arquivos = await pastas.where('uid_folder', '==', uid_folder).get().then(querySnapshot => {
          return querySnapshot.docs[0].ref.collection('arquivos').get()
        })

        const data = arquivos.docs.map(doc => {
          return {
            link: doc.data().link,
            nome: doc.data().nome
          }
        })
        return res.status(200).json(data)
      }
    } else {
      return res.status(200).json({ error: 'Bad Request' })
    }

  }
}
