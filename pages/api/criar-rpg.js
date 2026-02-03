// Arquivo criado: 04/01/2023 às 19:45

import NextAuth from '@/api/auth/[...nextauth].js'
import admin from '@/lib/backEnd/firebase.ts'
import Rpg from 'classes/Rpg'
import User from 'classes/User'
import { unstable_getServerSession } from 'next-auth/next'
import validator from 'validator'

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const { tipo, nome } = req.body

    const logado = await unstable_getServerSession(req, res, NextAuth)
    const nomeOk = validator.default.isAlphanumeric(nome, 'pt-BR', { ignore: ' ' })

    if (nomeOk) {
      if (logado) {
        if (nome.length > 20) {
          return res.status(401).json({ error: 'Nome muito longo' })
        } else {

          const rpgs = admin.firestore().collection('rpgs')
          const user = new User(logado.user.email)

          const send = async () => {
            const code = Rpg.GenerateCode()

            return await rpgs.where('code', '==', code).get().then(async val => {
              if (val.empty) {

                const hasAssinatura = await user.hasAssinatura()

                if (!hasAssinatura) {
                  const count = await user.contarRpgs()
                  if (count >= 5) {
                    return res.status(401).json({
                      error: 'Você atingiu o limite de 5 RPGs gratuitos. Assine o Taldo Plus para criar quantos você quiser!',
                      button: true
                    })
                  }
                }

                return rpgs.add({
                  code,
                  tipo,
                  user: logado.user.email,
                  dono: logado.user.name,
                  nome,
                  data: admin.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                  return res.status(200).json({ link: code })
                }).catch(() => {
                  return res.status(200).json({ error: 'Não foi possível criar o RPG. Reinicie a página e tente novamente' })
                })
              } else {
                return send()
              }
            })
          }

          return send()

        }
      } else {
        return res.status(200).json({ error: 'Unauthorized' })
      }
    } else {
      return res.status(200).json({ error: 'Nome inválido. Não use caracteres especiais' })
    }

  }
}
