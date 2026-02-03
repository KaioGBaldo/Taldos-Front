// Arquivo criado: 14/01/2023 às 13:20

import NextAuth from '@/api/auth/[...nextauth].js'
import admin from '@/lib/backEnd/firebase'
import User from 'classes/User'
import { unstable_getServerSession } from 'next-auth/next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const { email, image, base64, uid_folder } = req.body

    if (email && uid_folder) {

      const logado = await unstable_getServerSession(req, res, NextAuth)
      const userClass = new User(email)

      if (logado) {
        const user = admin.firestore().collection('usuarios').doc(email)
        const hasAssinatura = await userClass.hasAssinatura()

        const verifyingHash = async () => {
          return new Promise(resolve => {
            const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            user.collection('pastas').doc(uid_folder).collection('arquivos').where('hash', '==', hash).get().then(querySnapshot => {
              if (querySnapshot.empty) {
                resolve(hash)
              } else {
                verifyingHash()
              }
            })
          })
        }

        const DeployFile = async (base64, hash) => {

          return new Promise((resolve, reject) => {

            const extension = image.name.split('.').pop()
            const bucket = admin.storage().bucket(process.env.ONLY_STORAGE)
            const file = bucket.file(`usuarios/${email}/${uid_folder}/${hash}.${extension}`)

            // eslint-disable-next-line new-cap
            const buffer = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')

            return userClass.setMemoria(image.size).then(async () => {
              return await file.save(buffer, {
                metadata: {
                  contentType: image.type,
                  metadata: {
                    firebaseStorageDownloadTokens: hash
                  }
                },
                public: true,
                validation: 'md5'
              }).then(() => {
                // pegando url do arquivo
                file.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
                }).then(url => {
                  resolve(url[0])
                }).catch(() => reject())
              }).catch(() => reject())
            }).catch(() => reject())
          })

        }

        const saveInBase = async (hash, url, idFolder) => {
          return new Promise((resolve, reject) => {
            user.collection('pastas').doc(idFolder).collection('arquivos').add({
              nome: image.name,
              hash,
              link: url,
              data: new Date()
            }).then(() => {
              user.update({
                memoria: admin.firestore.FieldValue.increment(image.size)
              }).then(() => resolve()).catch(() => reject())
            }).catch(() => reject())
          })
        }

        if (base64.length <= 0) {
          return res.status(200).json({ error: 'Ocorreu um erro ao enviar o arquivo. Reinicie seu navegador e tente novamente' })
        }

        if (!hasAssinatura && image.size > 3 * 1024 * 1024) {
          return res.status(200).json({ error: 'Para enviar arquivos acima de 3MB você precisará assinar ao Taldo Plus' })
        }

        if (hasAssinatura && image.size > 10000000) {
          return res.status(200).json({ error: 'Lamentamos. Até o momento só é possível enviar arquivos com no máximo 10mb' })
        }

        if (!image.type.match('image.*')) {
          return res.status(200).json({ error: 'O arquivo deve ser uma imagem' })
        }

        await user.collection('pastas').where('uid_folder', '==', uid_folder).get().then(async querySnapshot => {
          if (querySnapshot.empty) {
            return res.status(200).json({ error: 'A pasta não existe' })
          }

          await verifyingHash().then(async hash => {
            await DeployFile(base64, hash).then(async url => {
              await saveInBase(hash, url, querySnapshot.docs[0].id).then(() => {
                return res.status(200).json({ ok: true })
              }).catch(() => {
                return res.status(200).json({ error: 'Ocorreu um erro ao enviar o arquivo. Reinicie seu navegador e tente novamente' })
              })
            }).catch(() => {
              return res.status(200).json({ error: 'Ocorreu um erro ao enviar o arquivo. Reinicie seu navegador e tente novamente' })
            })
          }).catch(() => {
            return res.status(200).json({ error: 'Ocorreu um erro ao enviar o arquivo. Reinicie seu navegador e tente novamente' })
          })

        })

      } else {
        return res.status(200).json({ error: 'Unauthorized' })
      }
    } else {
      return res.status(200).json({ error: 'Bad Request' })
    }
  }
}
