"use client"

import OrderContent from "@/components/payments/OrderContent"
import { Suspense } from 'react'

export default function orderPage() {
  return (
    <Suspense>
      <OrderContent/>
    </Suspense>
  )
}
