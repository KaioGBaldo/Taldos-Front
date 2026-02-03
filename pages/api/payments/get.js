// Arquivo criado: 07/01/2023 às 01:12

import { URL } from '@/lib/backEnd/vars'
import admin from '@/lib/backEnd/firebase'

const stripe = require('stripe')(process.env.STRIPE_TEST)

export default async function handler(req, res) {

  const { email } = req.body

  if (req.method === 'POST') {

    const YOUR_DOMAIN = URL

    /*
      Verifica se o usuário já possui um customer_id
      caso sim. então ele não pode ter os 30 dias gratis e o id do customer é passado para a sessão.
      caso não. então ele pode ter os 30 dias gratis.
    */
    const firstCustomer = await admin.firestore().collection('usuarios').doc(email).get().then(doc => {
      const data = doc.data()

      if (data === undefined) {
        return { customer_id: null, trial: true }
      }

      if (data.customer_id === undefined) {
        return { customer_id: null, trial: true }
      }

      return { customer_id: data.customer_id, trial: false }
    })

    try {
      const product = await stripe.products.retrieve(process.env.STRIPE_PRODUCT)

      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [{
          price: product.default_price,
          quantity: 1
        }],
        phone_number_collection: {
          enabled: true
        },
        mode: 'subscription',
        success_url: `${YOUR_DOMAIN}api/payments/set/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}h`,

        ...firstCustomer.trial
          ? {
            subscription_data: { trial_period_days: 30 },
            customer_email: email
          }
          : {
            customer: firstCustomer.customer_id
          }
      })

      return res.status(200).json({ url: session.url })
    } catch {
      return res.status(200).json({ error: 'error' })
    }
  }

}
