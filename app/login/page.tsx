'use client'

import { useState } from 'react'
import { CloudSun } from 'lucide-react'

const API_URL = 'https://dailyplanet-production.up.railway.app'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || 'Login failed')
        return
      }

      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))

      window.location.href = '/'
    } catch (error) {
      setMessage('Could not connect to the server')
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
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in to Daily Planet</h1>
          <p>
            Check the weather, manage your saved places, and get the most from
            your Daily Planet account.
          </p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="auth-password-row">
            <label htmlFor="password">Password</label>
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <a href="/signup">Create an account</a>
        </p>
      </div>
    </main>
  )
}