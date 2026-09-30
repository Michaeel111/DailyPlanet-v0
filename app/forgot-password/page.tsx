'use client'

import { useState } from 'react'
import { CloudSun, ArrowLeft } from 'lucide-react'

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
    <main className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-brand">
          <span className="auth-brand-icon">
            <CloudSun size={24} />
          </span>
          <span>Daily Planet</span>
        </a>

        <div className="auth-heading">
          <p className="eyebrow">Password recovery</p>
          <h1>Forgot your password?</h1>
          <p>
            Enter your email address and we'll send you a link to reset your
            Daily Planet password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="forgot-email">Email</label>

          <input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && (
            <p className="auth-success">
              {message}
            </p>
          )}

          {error && (
            <p className="auth-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <a href="/login" className="premium-back">
          <ArrowLeft size={16} />
          Back to Login
        </a>
      </div>
    </main>
  )
}