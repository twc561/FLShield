
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function GET(request: NextRequest) {
  try {
    const authHeader = headers().get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get user's customer ID from Firebase
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    if (!userData?.subscription?.customerId) {
      return NextResponse.json({ invoices: [] })
    }

    // Get invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: userData.subscription.customerId,
      limit: 20
    })

    const formattedInvoices = invoices.data.map(invoice => ({
      id: invoice.id,
      number: invoice.number,
      amount: invoice.total,
      currency: invoice.currency,
      status: invoice.status,
      created: new Date(invoice.created * 1000),
      dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
      paidAt: invoice.status_transitions.paid_at ? new Date(invoice.status_transitions.paid_at * 1000) : null,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf
    }))

    return NextResponse.json({ invoices: formattedInvoices })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}
