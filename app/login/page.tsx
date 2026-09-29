'use client'

import { useState } from 'react'

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
    <main style={{ maxWidth: '400px', margin: '80px auto', padding: '20px' }}>
      <h1>Daily Planet Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0' }}
        />
        <a
  href="/forgot-password"
  style={{
    display: 'block',
    marginTop: '10px',
    textAlign: 'right',
  }}
>
  Forgot password?
</a>
<p>
  Don't have an account?{' '}
  <a href="/signup">Sign Up</a>
</p>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', marginTop: '10px' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '15px' }}>
          {message}
        </p>
      )}
    </main>
  )
}