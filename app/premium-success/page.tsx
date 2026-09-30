'use client'

import { useEffect, useState } from 'react'

const API_URL = 'https://dailyplanet-production.up.railway.app'

export default function PremiumSuccessPage() {
  const [message, setMessage] = useState('Verifying your payment...')

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search)
      const reference = params.get('reference')

      if (!reference) {
        setMessage('Payment reference not found.')
        return
      }

      try {
        const response = await fetch(
          `${API_URL}/api/payment/verify/${reference}`
        )

        const result = await response.json()

        if (response.ok && result.success) {
          setMessage('Payment successful! Redirecting to Daily Planet...')

          setTimeout(() => {
            window.location.href = '/'
          }, 1500)

          return
        }

        setMessage(
          result.error ||
            result.message ||
            'Payment verification failed.'
        )
      } catch (error) {
        setMessage('Could not verify your payment.')
      }
    }

    verifyPayment()
  }, [])

  return (
    <main>
      <h1>Daily Planet Premium</h1>
      <p>{message}</p>
    </main>
  )
}