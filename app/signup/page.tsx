'use client'

import { useState } from 'react'

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
    <main>
      <h1>Create Account</h1>

      <p>Sign up for Daily Planet</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <a href="/login">Already have an account? Log in</a>
    </main>
  )
}