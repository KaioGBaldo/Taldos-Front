// Arquivo criado: 02/01/2023 às 15:44

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

        const personagens = await user.collection('personagems').get()
        const data = personagens.docs.map(doc => {
          return {
            id: doc.id,
            descricao: doc.data().descricao,
            nome: doc.data().nome,
            img: doc.data().img
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
