import admin from '@/lib/backEnd/firebase.ts'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const email = req.body.email
    const id_conquista = req.body.id_conquista

    if (email && id_conquista) {
      const user = admin.firestore().collection('usuarios').doc(email).collection('conquistas')

      await user.where('id', '==', id_conquista).get().then(querySnapshot => {
        if (querySnapshot.empty) {
          user.add({
            id: id_conquista,
            data: admin.firestore.FieldValue.serverTimestamp()
          })
          return res.status(200).json({ message: 1 })
        } else {
          return res.status(200).json({ message: 0 })
        }
      })
    } else {
      return res.status(200).json({ error: 'Bad Request' })
    }

  }
}
