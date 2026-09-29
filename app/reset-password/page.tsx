'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const API_URL = 'https://dailyplanet-production.up.railway.app'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || 'Could not reset password')
        return
      }

      setMessage('Password updated successfully. Redirecting to login...')

      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    } catch (error) {
      setMessage('Could not connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: '400px', margin: '80px auto', padding: '20px' }}>
      <h1>Reset Password</h1>

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
          }}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
          }}
        />

        <button
          type="submit"
          disabled={loading || !token}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '10px',
          }}
        >
          {loading ? 'Updating password...' : 'Update Password'}
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