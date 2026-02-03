// Arquivo criado: 02/01/2023 às 17:32

import admin from '@/lib/backEnd/firebase.ts'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const modos = await admin.firestore().collection('modos_de_jogo').where('ativo', '==', true).get()
    const data = modos.docs.map(doc => {
      return {
        id: doc.id,
        nome: doc.data().nome,
        ativo: doc.data().ativo,
        id_modo: doc.data().id_modo
      }
    })
    return res.status(200).json(data)

  }
}
