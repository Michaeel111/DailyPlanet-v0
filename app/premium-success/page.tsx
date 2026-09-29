'use client'

import { useEffect, useState } from 'react'

const API_URL = 'https://dailyplanet-production.up.railway.app'

export default function PremiumSuccessPage() {
  const [message, setMessage] = useState('Verifying your payment...')

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search)
      const reference = params.get('reference')
      const token = localStorage.getItem('token')

      if (!reference) {
        setMessage('No payment reference found.')
        return
      }

      if (!token) {
        setMessage('You are not logged in.')
        return
      }

      try {
        const response = await fetch(
          `${API_URL}/api/payment/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const result = await response.json()

        if (result.success) {
          setMessage('Payment successful! Redirecting...')

          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        } else {
          setMessage(
            result.message || 'Payment could not be verified.'
          )
        }
      } catch (error) {
        console.error(error)
        setMessage('Something went wrong verifying payment.')
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