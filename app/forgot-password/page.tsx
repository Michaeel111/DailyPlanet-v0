'use client'

import { useState } from 'react'

const API_URL = 'https://dailyplanet-production.up.railway.app'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setMessage('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message)
      } else {
        setError(result.error || 'Could not process request')
      }
    } catch (error) {
      setError('Could not connect to the server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Forgot Password</h1>

      <p>Enter your email address and we will send you a password reset link.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <a href="/login">Back to Login</a>
    </main>
  )
}