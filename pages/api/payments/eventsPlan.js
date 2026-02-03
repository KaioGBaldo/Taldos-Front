// Arquivo criado: 07/01/2023 às 14:46

// tive que instalar essa dependencia para funcionar o stripe com o next
// no geral tive q desabilitar o bodyparser do next e usar o micro pra fazer o buffer do webhook do stripe
import admin from '@/lib/backEnd/firebase'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false
  }
}

const stripe = require('stripe')(process.env.STRIPE_TEST)

export default async function handler(request, res) {
  if (request.method === 'POST') {
    const buf = await buffer(request)
    const sig = request.headers['stripe-signature']
    const endpointSecret = process.env.STRIPE_HEADER

    let event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }

    const verifyingIsPaid = async (invoice) => {
      if (invoice.customer_email !== null) {
        const user = admin.firestore().collection('usuarios').doc(invoice.customer_email)
        if (invoice.paid) {
          await user.collection('assinatura').doc('assinaturaSingle').set({
            current_period_end: invoice.period_end,
            current_period_start: invoice.period_start
          }, { merge: true })
          return res.status(200).json({ msg: `Tudo ok, assinatura paga de ${invoice.customer_email}` })
        } else {
          await user.set({
            current_period_end: null
          }, { merge: true })
          return res.status(200).json({ msg: `Tudo ok, assinatura não paga de ${invoice.customer_email}` })
        }
      } else {
        return res.status(200).json({ msg: 'recebemos a chamada mas n conseguimos atende-la pois n veio o email do usuário.' })
      }
    }

    const assinaturaCancelada = async (subscription) => {
      const base = admin.firestore().collection('usuarios')

      await base.where('customer_id', '==', subscription.customer).get().then(query => {
        query.docs.forEach(doc => {
          base.doc(doc.id).set({
            current_period_end: null
          }, { merge: true })
        })
        return res.status(200).json({ msg: `Tudo ok, assinatura cancelada de ${query.docs[0].id}` })
      }).catch(err => {
        return res.status(200).json({ err })
      })
    }

    // console.log(event.type)
    switch (event.type) {
    case 'invoice.updated':
      verifyingIsPaid(event.data.object)
      break
    case 'invoice.payment_succeeded':
      verifyingIsPaid(event.data.object)
      break
    case 'subscription_schedule.canceled':
      assinaturaCancelada(event.data.object)
      break
    case 'customer.subscription.deleted':
      assinaturaCancelada(event.data.object)
      break
      // customer.subscription.deleted - quando o cliente cancela a assinatura
    default:
      break
    }

  }
}
