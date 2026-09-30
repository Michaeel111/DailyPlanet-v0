'use client'

import { useState } from 'react'
import { CloudSun } from 'lucide-react'

const API_URL = 'https://dailyplanet-production.up.railway.app'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setMessage('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Account created successfully! You can now log in.')
        setEmail('')
        setPassword('')
      } else {
        setError(result.error || 'Could not create account')
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
          <p className="eyebrow">Join Daily Planet</p>
          <h1>Create your account</h1>
          <p>
            Create an account to save your favorite places and access more
            Daily Planet features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <a href="/login">Log in</a>
        </p>
      </div>
    </main>
  )
}