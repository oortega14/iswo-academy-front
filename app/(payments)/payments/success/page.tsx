"use client"

import SuccessPageContent from "@/components/payments/SuccessPageContent"
import { Suspense } from 'react'

export default function successPage() {
  return (
    <Suspense>
      <SuccessPageContent/>
    </Suspense>
  )
}
