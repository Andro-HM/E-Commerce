'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { placeOrder } from '@/lib/actions/orders'
import type { ShippingAddress } from '@/types/order'

const STEPS = ['Shipping', 'Payment', 'Confirmation']

const PAYMENT_METHODS = [
  { id: 'credit_card', label: 'Credit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'apple_pay', label: 'Apple Pay', icon: '🍎' },
  { id: 'google_pay', label: 'Google Pay', icon: '🔵' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const [shipping, setShipping] = useState<ShippingAddress>({
    full_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  })

  const [paymentMethod, setPaymentMethod] = useState('credit_card')

  function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep(1)
  }

  async function handlePlaceOrder() {
    setLoading(true)
    setError(null)
    try {
      const order = await placeOrder(shipping, paymentMethod)
      setOrderId(order.id)
      setStep(2)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                i < step
                  ? 'bg-gray-900 text-white'
                  : i === step
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${i < step ? 'bg-gray-900' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Shipping */}
      {step === 0 && (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">Shipping Address</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                value={shipping.full_name}
                onChange={(e) => setShipping({ ...shipping, full_name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
              <Input
                value={shipping.address_line1}
                onChange={(e) => setShipping({ ...shipping, address_line1: e.target.value })}
                placeholder="123 Main St"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (optional)</label>
              <Input
                value={shipping.address_line2}
                onChange={(e) => setShipping({ ...shipping, address_line2: e.target.value })}
                placeholder="Apt 4B"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Input
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <Input
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  placeholder="NY"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <Input
                  value={shipping.postal_code}
                  onChange={(e) => setShipping({ ...shipping, postal_code: e.target.value })}
                  placeholder="10001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <Input
                  value={shipping.country}
                  onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                  placeholder="US"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base">
            Continue to Payment
          </Button>
        </form>
      )}

      {/* Step 1: Payment */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">Payment Method</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                    paymentMethod === method.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium text-gray-900">{method.label}</span>
                  {paymentMethod === method.id && (
                    <Check className="h-5 w-5 ml-auto text-gray-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-medium text-gray-900 mb-3">Shipping to</h3>
            <p className="text-sm text-gray-600">{shipping.full_name}</p>
            <p className="text-sm text-gray-600">{shipping.address_line1}{shipping.address_line2 ? `, ${shipping.address_line2}` : ''}</p>
            <p className="text-sm text-gray-600">{shipping.city}, {shipping.state} {shipping.postal_code}</p>
            <p className="text-sm text-gray-600">{shipping.country}</p>
            <button onClick={() => setStep(0)} className="text-sm text-blue-600 hover:underline mt-2">
              Edit
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)} className="flex-1 h-12">
              Back
            </Button>
            <Button onClick={handlePlaceOrder} disabled={loading} className="flex-1 h-12 text-base">
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Confirmation */}
      {step === 2 && (
        <div className="text-center space-y-6">
          <div className="bg-white rounded-xl border p-10 space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="text-gray-500">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            {orderId && (
              <p className="text-sm text-gray-400 font-mono bg-gray-50 px-4 py-2 rounded-lg">
                Order ID: {orderId}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/')} className="flex-1 h-12">
              Continue Shopping
            </Button>
            <Button onClick={() => router.push('/profile')} className="flex-1 h-12">
              View Orders
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
