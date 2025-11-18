import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export const POST = async (req: NextRequest) => {
  const buf = await req.arrayBuffer()
  const body = Buffer.from(buf)
  const sig = req.headers.get('stripe-signature') || ''
  try {
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
    // handle events here
  } catch (error) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
  return NextResponse.json({ received: true })
}
