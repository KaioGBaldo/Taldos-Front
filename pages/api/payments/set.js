// Arquivo criado: 07/01/2023 às 02:33

import admin from '@/lib/backEnd/firebase'
import { URL } from '@/lib/backEnd/vars'

const stripe = require('stripe')(process.env.STRIPE_TEST)

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const { session_id } = req.query
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    if (checkoutSession.payment_status === 'paid') {
      const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription)

      if (checkoutSession.customer_details.email !== null) {
        const user = admin.firestore().collection('usuarios').doc(checkoutSession.customer_details.email)
        await user.collection('assinatura').doc('assinaturaSingle').set({
          subscription_id: subscription.id,
          current_period_start: subscription.current_period_start,
          trial_end: subscription.trial_end,
          trial_start: subscription.trial_start,
          plan: subscription.plan
        }, { merge: true }).then(() => {
          user.update({
            customer_id: checkoutSession.customer,
            current_period_end: subscription.current_period_end,
            phone: checkoutSession.customer_details.phone
          })
        })
      }

    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${URL}h`
    })

    res.redirect(303, portalSession.url)

  }
}
