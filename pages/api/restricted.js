import admin from '@/lib/backEnd/firebase'
import { unstable_getServerSession } from 'next-auth/next'
import NextAuth from './auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, NextAuth)

  if (session) {

    /**
     * para validar eu uso o seguinte:
     *
     * se o cookie 'end' e o 'int' não existir, eu pego o current_period_end do usuário no firestore
     *
     * se o current_period_end for menor que o timestamp atual, eu seto o cookie 'end' com o valor 0
     * se o current_period_end for maior que o timestamp atual, eu seto o cookie 'int' com o valor 0
     *
     * se o cookie 'end' existir, eu retorno que o usuário não tem assinatura
     * se o cookie 'int' existir, eu retorno que o usuário tem assinatura
     *
     */

    const end = req.cookies.end
    const int = req.cookies.int

    if (end === undefined && int === undefined) {
      admin.firestore().collection('usuarios').doc(session.user.email).get().then(doc => {

        const info = {
          partCookie: '',
          assinatura: false
        }

        if (doc.exists) {
          const current_period_end = doc.data().current_period_end
          const now = parseInt(Date.now().toString().substring(0, 10))

          if (current_period_end < now || current_period_end === 'null' || current_period_end === undefined) {
            info.partCookie = 'end'
            info.assinatura = false
          } else {
            info.partCookie = 'int'
            info.assinatura = true
          }
        } else {
          // o usuário é novo e nn tinha login antes.
          info.partCookie = 'end'
          info.assinatura = false
        }

        res.setHeader('Set-Cookie', `${info.partCookie}=0; Path=/; Max-Age=60; HttpOnly`)
        res.send({ ok: true, assinatura: info.assinatura })
      })
    } else {
      if (int !== undefined && end === undefined) {
        res.send({ ok: true, assinatura: true })
      } else {
        res.send({ ok: true, assinatura: false })

      }
    }
  } else {
    res.send({ ok: false, assinatura: false })
  }
}
