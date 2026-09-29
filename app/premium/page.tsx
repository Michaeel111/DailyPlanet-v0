'use client'

export default function PremiumPage() {
  return (
    <main>
      <h1>Daily Planet Premium</h1>

      <p>Upgrade to Premium for ₦5,000.</p>

      <ul>
        <li>Extended weather forecasts</li>
        <li>Premium weather features</li>
        <li>More detailed weather information</li>
      </ul>

      <button
  onClick={async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        'https://dailyplanet-production.up.railway.app/api/payment/initialize',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const result = await response.json()

      if (response.ok && result.authorization_url) {
        window.location.href = result.authorization_url
      } else {
        alert(result.error || 'Could not start payment')
      }
    } catch (error) {
      alert('Could not connect to the payment server')
    }
  }}
>
  Upgrade to Premium
</button>

      <p>
        Already Premium? Your account will automatically have access to
        Premium features after successful payment.
      </p>

      <a href="/">Back to Weather</a>
    </main>
  )
}