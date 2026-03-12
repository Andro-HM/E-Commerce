import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrders } from '@/lib/actions/orders'
import OrderCard from '@/components/profile/OrderCard'
import { User, Package } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const orders = await getOrders()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      {/* Profile Info */}
      <div className="bg-white rounded-xl border p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="h-7 w-7 text-gray-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {profile?.full_name ?? 'User'}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Member since {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Package className="h-5 w-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
          <span className="text-sm text-gray-400 ml-1">({orders.length} {orders.length === 1 ? 'order' : 'orders'})</span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No orders yet</p>
            <p className="text-gray-400 text-sm mt-1">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
